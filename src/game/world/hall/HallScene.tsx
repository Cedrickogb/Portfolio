'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import {
  Euler,
  MathUtils,
  NearestFilter,
  Quaternion,
  RepeatWrapping,
  Vector3,
  type Group,
  type PerspectiveCamera as ThreePerspectiveCamera,
  type Texture,
} from 'three';
import { INTERIOR_STYLES, interiorFloorArt, interiorWallArt, isInteriorStyle } from '@/game/assets/interiors';
import { PALETTE as P } from '@/game/assets/palette';
import { rasterFromPixelArt } from '@/game/assets/pixel';
import { textureFromRaster } from '@/game/assets/texture';
import { EXPERIENCE_DATA } from '@/data/constants';
import { consumeA, heldDirs } from '@/game/engine/input';
import { signDialogueAt, tileKey, warpAt, type ParsedMap } from '@/game/engine/grid';
import { dialogueIntent } from '@/game/engine/movement';
import { boomLength, fits, slide } from '@/game/engine/walk';
import { getMap } from '@/data/maps';
import { AMBIENCE } from '@/game/world/dayNight';
import { useGameStore } from '@/game/store/useGameStore';
import Avatar from './Avatar';
import {
  DOOR_H,
  DOOR_W,
  EYE_H,
  ROOM_H,
  bannerRaster,
  buildColumn,
  buildDoorway,
  buildLectern,
  buildPedestal,
  labelRaster,
  plaqueRaster,
} from './room';

/** Cadence de marche et de rotation, en cases et radians par seconde. */
const WALK = 2.7;
const BACK = 1.6;
const TURN = 2.3;
/** Recul maximal de la caméra en vue à la 3e personne. */
const BEHIND = 3.1;
const ABOVE = 1.9;
/**
 * Souplesses, par seconde. Le rapport entre les deux *est* le réglage.
 *
 * Le corps rattrape le regard vite ; l'orbite de la caméra, elle, traîne
 * franchement. C'est cet écart qui rend la rotation visible : à vitesses
 * égales, la caméra restait vissée derrière le personnage, sa silhouette ne
 * changeait pas d'un pixel et seule la salle semblait tourner — on ne voyait
 * donc jamais le corps suivre le regard. En laissant l'orbite en retard, on
 * voit l'épaule partir dans le sens du regard, puis la caméra se replacer.
 */
const CAM_FOLLOW = 9;
const CAM_YAW_FOLLOW = 4.2;
const BODY_TURN = 18;
/** Débattement du regard vertical. Au-delà, on regarde ses pieds ou le vide. */
const PITCH_MAX = 0.5;

const forwardOf = (yaw: number) => ({ x: Math.sin(yaw), z: -Math.cos(yaw) });

/** Lissage indépendant de la fréquence d'image : 60 ou 30 fps, même inertie. */
const damp = (current: number, target: number, rate: number, dt: number) =>
  MathUtils.lerp(current, target, 1 - Math.exp(-rate * dt));

/** Écart d'angle le plus court, pour ne pas tourner de 350° au lieu de 10°. */
const angleDelta = (from: number, to: number) => {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
};

/** Orientation de carte la plus proche du regard, pour la sauvegarde. */
function facingOf(yaw: number): 'up' | 'down' | 'left' | 'right' {
  const t = ((yaw % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  if (t < Math.PI / 4 || t >= (Math.PI * 7) / 4) return 'up';
  if (t < (Math.PI * 3) / 4) return 'right';
  if (t < (Math.PI * 5) / 4) return 'down';
  return 'left';
}

/**
 * Hall des trophées, en vraie 3D.
 *
 * Tout le reste du jeu est une vue de dessus orthographique, aux pixels calés
 * sur la grille de l'écran, sans une seule lumière. Cette salle rompt les trois
 * règles à la fois : caméra en perspective, déplacement libre, éclairage
 * calculé. C'est délibéré et c'est **local** — le contraste est le propos. On
 * pousse une porte dans un jeu à la Game Boy et on se retrouve dans une salle
 * d'exposition où l'on marche.
 *
 * Ce qui ne change pas : la carte est la même grille de caractères, les stèles
 * sont les mêmes cases, les textures sortent de la même palette et la même
 * fonte 3x5 grave les cartels. La salle appartient encore au même monde.
 */
export default function HallScene({ map }: { map: ParsedMap }) {
  const gl = useThree((s) => s.gl);
  const camera = useRef<ThreePerspectiveCamera>(null);
  const avatar = useRef<Group>(null);

  const view = useGameStore((s) => s.view);
  const phase = useGameStore((s) => s.phase);
  /* Seul état de la marche qui remonte jusqu'à React : le pas est une
     animation, pas une donnée de jeu, mais le corps du visiteur en dépend. */
  const [walking, setWalking] = useState(false);

  /* Position continue et cap, hors React : ils changent à chaque image et un
     re-render par pas n'aurait aucun sens. Le store ne reçoit que la case
     entière, quand elle change — c'est ce que lisent les stèles et la
     sauvegarde. */
  /* Position de départ : celle du store, pas le spawn de la carte.
     Sinon une partie reprise dans le hall replace le visiteur à la porte
     alors que sa sauvegarde le disait devant une stèle — et l'affichage
     (qui lit le store) et la scène (qui lit le spawn) se contrediraient. */
  const start = useRef<{ x: number; y: number }>(
    fits(map, useGameStore.getState().tile.x, useGameStore.getState().tile.y)
      ? { ...useGameStore.getState().tile }
      : { ...map.spawn },
  );
  const pos = useRef({ ...start.current });
  const yaw = useRef(0);
  /* Regard vertical, séparé du cap : le déplacement reste horizontal quoi que
     regarde la caméra — sinon viser le plafond ferait décoller le visiteur. */
  const pitch = useRef(0);
  /* Orientation du corps, qui rattrape le cap au lieu de lui être soudée.
     Une caméra et un personnage qui pivotent d'un bloc donnent l'impression de
     faire tourner la salle, pas de tourner la tête. */
  const bodyYaw = useRef(0);
  /* Cap de l'orbite de caméra, distinct du cap du regard. */
  const camYaw = useRef(0);
  const bob = useRef(0);
  /* Premier placement sans inertie : une caméra qui *rejoint* sa place depuis
     l'origine du monde ferait entrer le visiteur par un vol plané à travers la
     façade. On lisse les mouvements, pas les arrivées. */
  const camSnap = useRef(true);
  const lastTile = useRef(tileKey(start.current.x, start.current.y));

  /* La case du store est recalée sur le point de départ retenu : les deux
     sources doivent dire la même chose dès la première image. */
  useEffect(() => {
    useGameStore.setState({ tile: { x: start.current.x, y: start.current.y } });
  }, []);

  // Passer de la 1re à la 3e personne est un saut, pas un travelling.
  useEffect(() => {
    camSnap.current = true;
  }, [view]);

  const style = INTERIOR_STYLES[isInteriorStyle(map.interiorStyle) ? map.interiorStyle : 'hall'];

  const textures = useMemo(() => {
    const pixel = (t: Texture, rx: number, ry: number) => {
      t.magFilter = NearestFilter;
      t.minFilter = NearestFilter;
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(rx, ry);
      return t;
    };
    return {
      floor: pixel(
        textureFromRaster(rasterFromPixelArt(interiorFloorArt(style))),
        map.width,
        map.height,
      ),
      wall: pixel(textureFromRaster(rasterFromPixelArt(interiorWallArt(style))), 1, 1),
      banner: textureFromRaster(bannerRaster('Hall des trophees')),
      exit: textureFromRaster(labelRaster('Sortie')),
    };
  }, [style, map.width, map.height]);

  /* Cartels : un par stèle, gravés à la fonte du jeu. */
  const plaques = useMemo(
    () =>
      map.positions.trophy.map((t) => {
        const id = map.trophies[tileKey(t.x, t.y)];
        const job = EXPERIENCE_DATA.find((e) => e.id === id);
        return {
          tile: t,
          texture: textureFromRaster(plaqueRaster(job?.company ?? id, job?.period ?? '')),
        };
      }),
    [map],
  );

  const geometries = useMemo(
    () => ({
      pedestal: buildPedestal(),
      column: buildColumn(),
      lectern: buildLectern(),
      doorway: buildDoorway(),
    }),
    [],
  );

  /* Portes : la case de mur qui touche une case de téléportation. Rien n'est
     écrit en dur — la porte est là où la carte dit qu'on sort, et une salle
     avec deux sorties en aurait deux sans une ligne de plus. */
  const doors = useMemo(() => {
    const found: { x: number; y: number; angle: number }[] = [];
    for (const key of Object.keys(map.warps)) {
      const [wx, wy] = key.split(',').map(Number);
      const sides = [
        [0, 1, 0],
        [0, -1, Math.PI],
        [1, 0, -Math.PI / 2],
        [-1, 0, Math.PI / 2],
      ] as const;
      for (const [dx, dy, angle] of sides) {
        if (map.kinds[wy + dy]?.[wx + dx] === 'wall') {
          found.push({ x: wx + dx, y: wy + dy, angle });
        }
      }
    }
    return found;
  }, [map]);

  const doorKeys = useMemo(() => new Set(doors.map((d) => tileKey(d.x, d.y))), [doors]);

  useEffect(() => {
    return () => {
      Object.values(textures).forEach((t) => t.dispose());
      Object.values(geometries).forEach((g) => g.dispose());
      plaques.forEach((p) => p.texture.dispose());
    };
  }, [textures, geometries, plaques]);

  /* Regard à la souris : un glissement sur le canvas fait pivoter la tête.
     Le clavier suffit à tout faire (les flèches pivotent), mais au bureau on
     essaie la souris avant de chercher une touche. */
  useEffect(() => {
    const el = gl.domElement;
    let dragging = false;
    const down = (e: PointerEvent) => {
      if (e.button === 0) dragging = true;
    };
    const up = () => { dragging = false; };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      yaw.current += e.movementX * 0.004;
      pitch.current = MathUtils.clamp(pitch.current - e.movementY * 0.003, -PITCH_MAX, PITCH_MAX);
    };
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointermove', move);
    };
  }, [gl]);

  const target = useMemo(() => new Vector3(), []);
  const wanted = useMemo(() => new Vector3(), []);
  const camQuat = useMemo(() => new Quaternion(), []);
  const camEuler = useMemo(() => new Euler(), []);

  /* Poignée de test, hors production : la position continue et le cap ne
     vivent pas dans le store (ils changent à chaque image), donc un pilote de
     navigateur n'a aucun moyen de les lire — et une position de salle qui ne
     correspond pas à la case affichée est indébogable sans eux. */
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    (window as unknown as { hall?: unknown }).hall = { pos, yaw, pitch, bodyYaw, camYaw, start };
  }, []);

  useFrame((_, dt) => {
    const s = useGameStore.getState();
    const cam = camera.current;
    if (!cam) return;

    /* Un menu ou une fiche suspend la visite : c'est `useUiInput` qui a la
       main, et lui prendre les entrées ici rendrait B inopérant. */
    const busy = !s.started || s.menu !== null || s.questId !== null || s.techKey !== null;
    const step = Math.min(dt, 0.05); // une image longue ne doit pas téléporter

    /* Un dialogue ouvert gèle le déplacement mais **pas** la touche A : sans
       cela, le panneau d'accueil s'ouvrait et plus rien ne pouvait le faire
       avancer ni le fermer. Les règles viennent de `dialogueIntent`, celles-là
       mêmes qu'applique la vue de dessus — les réécrire ici, c'était les
       oublier ici. */
    if (!busy && s.dialogue) {
      const intent = dialogueIntent(consumeA(), s.dialogue);
      if (intent.kind === 'reveal-line') s.revealLine();
      else if (intent.kind === 'advance-dialogue') s.advanceDialogue();
    }

    if (!busy && !s.dialogue) {
      /* Les deux axes sont lus **ensemble** : on avance en pivotant, donc on
         décrit une courbe. C'est le geste de base dans une salle, et c'est
         précisément ce que l'ancienne lecture « dernière touche tenue »
         interdisait. */
      const dirs = heldDirs();
      const turn = (dirs.includes('right') ? 1 : 0) - (dirs.includes('left') ? 1 : 0);
      const drive = (dirs.includes('up') ? 1 : 0) - (dirs.includes('down') ? 1 : 0);

      if (turn !== 0) yaw.current += turn * TURN * step;

      if (drive !== 0) {
        const speed = drive > 0 ? WALK : -BACK;
        const f = forwardOf(yaw.current);
        const next = slide(map, pos.current, f.x * speed * step, f.z * speed * step);
        bob.current += Math.hypot(next.x - pos.current.x, next.y - pos.current.y);
        pos.current = next;
      }

      const tile = { x: Math.round(pos.current.x), y: Math.round(pos.current.y) };
      const key = tileKey(tile.x, tile.y);
      if (key !== lastTile.current) {
        lastTile.current = key;
        /* La case entière est la seule chose que le reste du jeu ait besoin de
           savoir : c'est elle qui déclenche les cartels et part en sauvegarde. */
        useGameStore.setState({ tile, facing: facingOf(yaw.current) });

        const warp = warpAt(map, tile.x, tile.y);
        if (warp) {
          s.warpTo(warp.to, warp.at, warp.facing ?? 'down', getMap(warp.to).interior);
          return;
        }
      }

      if (consumeA()) {
        // A devant la stèle d'accueil : le même dialogue que dans les autres salles.
        const f = forwardOf(yaw.current);
        const ax = Math.round(pos.current.x + f.x);
        const ay = Math.round(pos.current.y + f.z);
        const lines = signDialogueAt(map, ax, ay);
        if (lines) s.openDialogue(lines);
      }
    }

    const f = forwardOf(yaw.current);
    // Léger balancement de marche : c'est lui qui donne le pas, en subjectif.
    const sway = Math.sin(bob.current * 4) * 0.02;

    if (view === 'first') {
      cam.position.set(pos.current.x, EYE_H + sway, pos.current.y);
      const cp = Math.cos(pitch.current);
      target.set(
        pos.current.x + f.x * cp,
        EYE_H + sway + Math.sin(pitch.current),
        pos.current.y + f.z * cp,
      );
    } else {
      /* L'orbite suit le regard avec du retard : c'est ce décalage qui donne à
         voir le corps pivoter. Un replacement sec (arrivée, changement de vue)
         se fait *avant* le calcul, sinon la première image utiliserait encore
         l'ancien cap. */
      if (camSnap.current) camYaw.current = yaw.current;
      else {
        camYaw.current +=
          angleDelta(camYaw.current, yaw.current) * (1 - Math.exp(-CAM_YAW_FOLLOW * step));
      }
      const c = forwardOf(camYaw.current);

      /* Bras de caméra mesuré contre les murs : il se replie au lieu de passer
         au travers. Sans ce garde-fou, reculer contre une cloison faisait
         regarder la salle depuis l'extérieur. */
      const boom = Math.max(0.9, boomLength(map, pos.current.x, pos.current.y, -c.x, -c.z, BEHIND));
      /* Bras replié = caméra plus haute. Repliée sans compensation, elle finit
         le nez dans la nuque du visiteur et l'écran n'est plus qu'une touffe de
         cheveux ; en montant, elle regarde par-dessus son épaule et la salle
         reste visible. */
      const squeeze = 1 - boom / BEHIND;
      wanted.set(
        pos.current.x - c.x * boom,
        ABOVE + squeeze * 0.75 - pitch.current * 1.4,
        pos.current.y - c.z * boom,
      );
      /* La caméra rejoint sa place en douceur. Soudée au cap, elle donnait
         l'impression de faire pivoter la salle autour d'un personnage immobile ;
         en retard d'une fraction de seconde, elle *suit* quelqu'un qui tourne. */
      if (camSnap.current) {
        cam.position.copy(wanted);
        camSnap.current = false;
      } else {
        cam.position.set(
          damp(cam.position.x, wanted.x, CAM_FOLLOW, step),
          damp(cam.position.y, wanted.y, CAM_FOLLOW, step),
          damp(cam.position.z, wanted.z, CAM_FOLLOW, step),
        );
      }
      /* La visée suit l'orbite, pas le regard : le personnage reste au centre
         du cadre et c'est son *corps* qui tourne dedans. Viser le long du
         regard le pousserait au bord de l'écran à chaque coup d'œil. */
      target.set(
        pos.current.x + c.x * 1.3,
        0.62 + pitch.current * 2.2,
        pos.current.y + c.z * 1.3,
      );
    }
    cam.lookAt(target);

    /* Le personnage n'est plus un panneau tourné vers la caméra mais un corps :
       il regarde là où il marche, et rattrape le cap plutôt que d'y être collé.
       C'est ce décalage qui se lit comme « il se tourne ». */
    const g = avatar.current;
    if (g) {
      bodyYaw.current += angleDelta(bodyYaw.current, yaw.current) * (1 - Math.exp(-BODY_TURN * step));
      g.position.set(pos.current.x, 0, pos.current.y);
      camEuler.set(0, bodyYaw.current, 0);
      camQuat.setFromEuler(camEuler);
      g.quaternion.copy(camQuat);
    }

    const held = heldDirs();
    setWalking(!busy && !s.dialogue && (held.includes('up') || held.includes('down')));
  });

  const ambient = AMBIENCE[phase].lamps ? 0.34 : 0.6;
  const floorCenter: [number, number, number] = [map.width / 2 - 0.5, 0, map.height / 2 - 0.5];

  return (
    <group>
      <PerspectiveCamera makeDefault ref={camera} fov={62} near={0.05} far={60} />

      {/* Éclairage réel, la raison d'être de cette salle. L'ambiante baisse la
          nuit : le hall a des lanterneaux, donc il suit le ciel. */}
      <ambientLight intensity={ambient} color="#cfd8ff" />
      <hemisphereLight args={['#ffffff', P.stoneDark, ambient * 0.5]} />

      {plaques.map(({ tile }) => (
        <spotLight
          key={`${tile.x},${tile.y}`}
          position={[tile.x, ROOM_H - 0.25, tile.y + 0.15]}
          target-position={[tile.x, 0.9, tile.y]}
          angle={0.55}
          penumbra={0.6}
          intensity={9}
          distance={8}
          decay={1.1}
          color="#ffe6b0"
        />
      ))}
      <pointLight position={[map.spawn.x, 2.2, map.spawn.y + 1]} intensity={4} distance={7} decay={1.2} color="#ffd9a0" />

      {/* Sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={floorCenter} receiveShadow>
        <planeGeometry args={[map.width, map.height]} />
        <meshLambertMaterial map={textures.floor} />
      </mesh>

      {/* Plafond : sans lui, la salle n'est pas une salle mais un plateau. */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[floorCenter[0], ROOM_H, floorCenter[2]]}>
        <planeGeometry args={[map.width, map.height]} />
        <meshLambertMaterial color={P.stoneDark} />
      </mesh>

      {/* Lanterneau : la lumière doit venir de quelque part. Sans source
          visible, une salle éclairée par magie a l'air d'un défaut de rendu. */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[floorCenter[0], ROOM_H - 0.02, 5]}
      >
        <planeGeometry args={[map.width - 8, 1.8]} />
        <meshBasicMaterial color="#f0e2bd" />
      </mesh>

      {/* Bandeau gravé au-dessus des stèles, à la fonte du jeu. */}
      <mesh position={[floorCenter[0], 2.35, 1.55]}>
        <planeGeometry args={[7, 1.75]} />
        <meshLambertMaterial map={textures.banner} transparent />
      </mesh>

      {/* Tapis, de la porte jusqu'aux stèles : il dit où aller sans un mot. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[map.spawn.x, 0.012, 9]}>
        <planeGeometry args={[1.6, 8]} />
        <meshLambertMaterial color={P.roofRed} />
      </mesh>

      {/* Murs, la porte exceptée : elle a sa propre géométrie. */}
      {map.positions.wall
        .filter((t) => !doorKeys.has(tileKey(t.x, t.y)))
        .map((t) => (
          <mesh key={`w${t.x},${t.y}`} position={[t.x, ROOM_H / 2, t.y]}>
            <boxGeometry args={[1, ROOM_H, 1]} />
            <meshLambertMaterial map={textures.wall} color={P.white} />
          </mesh>
        ))}

      {/* Porte de sortie : chambranle, jour du dehors, et le mot pour le dire. */}
      {doors.map((d) => (
        <group key={`d${d.x},${d.y}`} position={[d.x, 0, d.y]} rotation={[0, d.angle, 0]}>
          <mesh geometry={geometries.doorway}>
            <meshLambertMaterial vertexColors />
          </mesh>
          {/* Le jour qui entre : c'est lui, plus que le chambranle, qui fait
              lire « sortie » depuis l'autre bout de la salle.

              Côté **intérieur** (z négatif) et retourné d'un demi-tour : un
              plan regarde vers +z par défaut, donc posé de l'autre côté il ne
              montrait à la salle que son dos — invisible — et l'embrasure
              s'ouvrait sur le vide noir derrière le mur. C'est ce qu'on voyait
              à droite de la porte. */}
          <mesh position={[0, DOOR_H / 2, -0.5]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[DOOR_W, DOOR_H]} />
            <meshBasicMaterial color="#f6f0da" />
          </mesh>
          <mesh position={[0, DOOR_H + 0.11, -0.52]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.0, 0.3]} />
            <meshLambertMaterial map={textures.exit} transparent />
          </mesh>
          <pointLight position={[0, 1.4, -0.9]} intensity={5} distance={5} decay={1.3} color="#fff6e0" />
        </group>
      ))}

      {/* Stèles : socle, cartel gravé, et le trophée lui-même */}
      {plaques.map(({ tile, texture }) => (
        <group key={`p${tile.x},${tile.y}`} position={[tile.x, 0, tile.y]}>
          <mesh geometry={geometries.pedestal}>
            <meshLambertMaterial vertexColors />
          </mesh>
          <mesh position={[0, 1.16, 0]}>
            <boxGeometry args={[0.34, 0.42, 0.34]} />
            <meshLambertMaterial color={P.roofCopper} />
          </mesh>
          <mesh position={[0, 0.62, 0.42]}>
            <planeGeometry args={[0.72, 0.24]} />
            <meshLambertMaterial map={texture} />
          </mesh>
        </group>
      ))}

      {/* Colonnes aux quatre coins : les cases de décor de la carte 2D. */}
      {(map.positions.props.V ?? []).map((t) => (
        <mesh key={`c${t.x},${t.y}`} position={[t.x, 0, t.y]} geometry={geometries.column}>
          <meshLambertMaterial vertexColors />
        </mesh>
      ))}

      {/* Panneau d'accueil, sur la case du panneau 2D. */}
      {map.positions.sign.map((t) => (
        <mesh key={`s${t.x},${t.y}`} position={[t.x, 0, t.y]} geometry={geometries.lectern}>
          <meshLambertMaterial vertexColors />
        </mesh>
      ))}

      {/* Le visiteur, en volume et à la palette du sprite. */}
      {view === 'third' && (
        <group ref={avatar}>
          <Avatar phase={bob} walking={walking} />
        </group>
      )}
    </group>
  );
}
