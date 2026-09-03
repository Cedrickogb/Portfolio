'use client';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  AdditiveBlending,
  Matrix4,
  MultiplyBlending,
  NormalBlending,
  PlaneGeometry,
  type InstancedMesh,
  type Mesh,
  type OrthographicCamera,
} from 'three';
import { PROP_HEIGHT } from '@/game/assets/geometry';
import { glowRaster } from '@/game/assets/raster';
import { textureFromRaster } from '@/game/assets/texture';
import { AMBIENCE } from './dayNight';
import { useGameStore } from '@/game/store/useGameStore';
import type { Tile } from '@/game/engine/grid';

/* Ordres de rendu. Le voile passe après tout le décor, les halos après le
   voile : c'est ce qui leur permet de *percer* la nuit au lieu d'être teintés
   avec elle. Un halo dessiné avant le voile serait multiplié par le bleu et ne
   ferait plus aucune lumière. */
const TINT_ORDER = 900;
const GLOW_ORDER = 910;

/**
 * Voile de couleur plaqué devant la caméra.
 *
 * Attaché à la caméra plutôt qu'à la scène : il couvre l'écran quoi qu'il
 * arrive, sans avoir à connaître l'étendue de la carte ni à suivre le joueur.
 * Sa taille se lit sur la caméra elle-même — en orthographique, le champ
 * visible vaut (droite - gauche) / zoom.
 */
function ScreenTint({
  color,
  blend,
  opacity,
  order,
}: {
  color: string;
  blend: 'multiply' | 'normal';
  opacity: number;
  order: number;
}) {
  const camera = useThree((s) => s.camera);
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const cam = camera as OrthographicCamera;
    mesh.position.copy(cam.position);
    mesh.quaternion.copy(cam.quaternion);
    mesh.translateZ(-(cam.near + 0.2));
    mesh.scale.set((cam.right - cam.left) / cam.zoom, (cam.top - cam.bottom) / cam.zoom, 1);
  });

  return (
    <mesh ref={ref} renderOrder={order}>
      <planeGeometry args={[1, 1]} />
      {/* `transparent` n'est pas là pour l'opacité — la multiplication n'en a
          pas besoin — mais pour le *classement*. Un matériau opaque est rendu
          dans la passe opaque, or les sprites (le joueur, les touffes) sont
          transparents et passent donc **après** : ils échappaient au voile et
          le héros se promenait en plein jour dans une ville de nuit. Marqué
          transparent, le voile rejoint la même passe, où `renderOrder` tranche. */}
      <meshBasicMaterial
        color={color}
        blending={blend === 'multiply' ? MultiplyBlending : NormalBlending}
        transparent
        opacity={opacity}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

/** Nappe de lumière au sol et tête allumée, sous chaque lampadaire. */
function Lamps({ positions }: { positions: Tile[] }) {
  const pool = useRef<InstancedMesh>(null);
  const head = useRef<InstancedMesh>(null);

  const glow = useMemo(() => textureFromRaster(glowRaster(32, 32)), []);
  const geometries = useMemo(() => {
    const ground = new PlaneGeometry(4.6, 2.8);
    ground.rotateX(-Math.PI / 2);
    return { ground, head: new PlaneGeometry(1.1, 1.1) };
  }, []);

  useEffect(
    () => () => {
      glow.dispose();
      geometries.ground.dispose();
      geometries.head.dispose();
    },
    [glow, geometries],
  );

  /* `useLayoutEffect` et non `useEffect` : la sphère englobante d'un
     `InstancedMesh` est calculée par le rendu **une seule fois**, à la première
     image, et mise en cache. Si les matrices d'instance sont encore vides à ce
     moment-là, la sphère se réduit à l'origine du monde — et le tas entier de
     halos disparaît par élimination de hors-champ dès que la caméra s'en
     éloigne. Le symptôme est intermittent, donc pire qu'une panne franche : on
     l'attribue à autre chose. On peuple les matrices avant la première image,
     et on recalcule la sphère nous-mêmes. */
  useLayoutEffect(() => {
    const m = new Matrix4();
    positions.forEach((p, i) => {
      m.setPosition(p.x, 0.03, p.y);
      pool.current?.setMatrixAt(i, m);
      m.setPosition(p.x, PROP_HEIGHT.lamp - 0.12, p.y);
      head.current?.setMatrixAt(i, m);
    });
    for (const mesh of [pool.current, head.current]) {
      if (!mesh) continue;
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
    }
  }, [positions]);

  if (positions.length === 0) return null;

  return (
    <>
      <instancedMesh
        ref={pool}
        args={[undefined, undefined, positions.length]}
        renderOrder={GLOW_ORDER}
      >
        <primitive object={geometries.ground} attach="geometry" />
        <meshBasicMaterial
          map={glow}
          color="#ffd98a"
          blending={AdditiveBlending}
          depthTest={false}
          depthWrite={false}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </instancedMesh>

      {/* Tête du lampadaire : le même halo, dressé face à la caméra. Sans lui,
          la nappe au sol semble venir de nulle part. */}
      <instancedMesh
        ref={head}
        args={[undefined, undefined, positions.length]}
        renderOrder={GLOW_ORDER}
      >
        <primitive object={geometries.head} attach="geometry" />
        <meshBasicMaterial
          map={glow}
          color="#fff0b4"
          blending={AdditiveBlending}
          depthTest={false}
          depthWrite={false}
          transparent
          opacity={0.75}
          toneMapped={false}
        />
      </instancedMesh>
    </>
  );
}

/**
 * Ambiance de la scène : voile coloré et lumières allumées.
 *
 * Ne s'applique qu'aux cartes extérieures. Un intérieur n'a pas de ciel : le
 * teinter en bleu la nuit donnerait une salle en panne d'électricité.
 */
export default function Ambience({ lamps, outdoor }: { lamps: Tile[]; outdoor: boolean }) {
  const phase = useGameStore((s) => s.phase);
  const ambience = AMBIENCE[phase];

  if (!outdoor) return null;

  return (
    <>
      {ambience.tint && (
        <ScreenTint color={ambience.tint} blend="multiply" opacity={1} order={TINT_ORDER} />
      )}
      {ambience.veil && (
        <ScreenTint
          color={ambience.veil.color}
          blend="normal"
          opacity={ambience.veil.opacity}
          order={TINT_ORDER + 1}
        />
      )}
      {ambience.lamps && <Lamps positions={lamps} />}
    </>
  );
}
