'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { Vector3, type OrthographicCamera as ThreeOrthographicCamera } from 'three';
import { CAMERA_LERP, CAMERA_OFFSET } from '@/game/config';
import { playerVisual } from '@/game/engine/runtime';

const desired = new Vector3();
const snapped = new Vector3();

export default function FollowCamera({
  dpr,
  pixelsPerTile,
  bounds,
}: {
  dpr: number;
  pixelsPerTile: number;
  /** Dimensions de la carte, en tuiles : la caméra ne sort pas de ce cadre. */
  bounds: { width: number; height: number };
}) {
  const ref = useRef<ThreeOrthographicCamera>(null);
  const size = useThree((s) => s.size);

  /* En caméra orthographique, zoom = pixels CSS par unité monde. On le fixe à
     un nombre entier de pixels par tuile : agrandir la fenêtre montre alors
     davantage de monde plutôt que d'étirer l'image, et une tuile occupe
     toujours un nombre entier de pixels. */
  const zoom = pixelsPerTile;

  /* Base de la caméra. Son orientation ne change jamais (le décalage est fixe),
     donc elle se calcule une fois pour toutes. */
  const basis = useMemo(() => {
    const offset = new Vector3(...CAMERA_OFFSET);
    const dir = offset.clone().normalize(); // de la cible vers la caméra
    const right = new Vector3(0, 1, 0).cross(dir).normalize();
    const up = dir.clone().cross(right).normalize();
    return { offset, dir, right, up };
  }, []);

  /* Demi-champ visible, en tuiles.
     En vertical, la caméra étant inclinée, un déplacement d'une unité le long
     de son axe « haut » balaie plus d'une tuile au sol : d'où le facteur
     hypot(y,z)/y, qui redresse la mesure dans le plan du sol. */
  const halfX = size.width / zoom / 2;
  const halfZ =
    (size.height / zoom / 2) * (Math.hypot(CAMERA_OFFSET[1], CAMERA_OFFSET[2]) / CAMERA_OFFSET[1]);

  /* Calage sur les bords : sans lui, un écran étroit et haut montre le vide
     au-delà de la carte dès que le joueur s'approche d'un bord. Si la carte
     est plus petite que le champ, on la centre au lieu de la coller à un bord. */
  const clampAxis = (value: number, half: number, extent: number) => {
    if (half * 2 >= extent) return (extent - 1) / 2;
    return Math.min(Math.max(value, half - 0.5), extent - 0.5 - half);
  };

  useFrame(() => {
    const cam = ref.current;
    if (!cam) return;

    desired
      .set(
        clampAxis(playerVisual.x, halfX, bounds.width),
        0,
        clampAxis(playerVisual.z, halfZ, bounds.height),
      )
      .add(basis.offset);
    cam.position.lerp(desired, CAMERA_LERP);

    /* Anti-shimmer. Si la caméra se déplace de fractions de pixel, les arêtes
       du pixel art grouillent à chaque frame. On quantifie donc sa position sur
       la grille de pixels du tampon de rendu, dans son propre repère : un pixel
       vaut 1 / (zoom * dpr) unités monde. */
    const pixel = 1 / (zoom * dpr);
    const r = Math.round(cam.position.dot(basis.right) / pixel) * pixel;
    const u = Math.round(cam.position.dot(basis.up) / pixel) * pixel;
    const d = cam.position.dot(basis.dir);
    snapped
      .copy(basis.right).multiplyScalar(r)
      .addScaledVector(basis.up, u)
      .addScaledVector(basis.dir, d);
    cam.position.copy(snapped);

    cam.lookAt(snapped.clone().sub(basis.offset));
  });

  return (
    <OrthographicCamera
      makeDefault
      ref={ref}
      zoom={zoom}
      near={0.1}
      far={200}
      position={CAMERA_OFFSET as unknown as [number, number, number]}
    />
  );
}
