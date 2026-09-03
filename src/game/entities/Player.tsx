'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group, type Mesh, type MeshBasicMaterial } from 'three';
import {
  CAMERA_OFFSET,
  SHADOW_OPACITY,
  SHADOW_Y,
  STEP_MS_BY_TRAVEL,
  TILE_TEXELS,
  shadowOffset,
} from '@/game/config';
import { HERO, HERO_HEIGHT, HERO_ROW, HERO_SHADOW_H, HERO_SHADOW_W, LOOKS, heroAtlas, heroShadowRaster } from '@/game/assets/hero';
import { PALETTE } from '@/game/assets/palette';
import { textureFromRaster } from '@/game/assets/texture';
import { consumeA, heldDir } from '@/game/engine/input';
import { sfx } from '@/game/audio/sfx';
import { decide } from '@/game/engine/movement';
import type { ParsedMap } from '@/game/engine/grid';
import { playerVisual } from '@/game/engine/runtime';
import { AMBIENCE } from '@/game/world/dayNight';
import { getMap } from '@/data/maps';
import { useGameStore } from '@/game/store/useGameStore';
import { useLang } from '@/i18n/LangProvider';

/* Inclinaison du sprite pour qu'il fasse face à la caméra. La caméra étant
   fixe en orientation, l'angle se calcule une fois : pas de billboard par
   frame à recalculer. */
const BILLBOARD_TILT = -Math.atan2(CAMERA_OFFSET[1], CAMERA_OFFSET[2]);

/* Une tuile mesure TILE_TEXELS texels : la taille monde du sprite se déduit
   donc directement de son format, sans constante à resynchroniser à la main. */
const SPRITE_W = HERO.frameW / TILE_TEXELS;
const SPRITE_H = HERO.frameH / TILE_TEXELS;
const SHADOW_W = HERO_SHADOW_W / TILE_TEXELS;
const SHADOW_H = HERO_SHADOW_H / TILE_TEXELS;
/** Même décalage que pour les décors : le soleil est unique dans la scène. */
const [SHADOW_DX, SHADOW_DZ] = shadowOffset(HERO_HEIGHT);

export default function Player({ map }: { map: ParsedMap }) {
  const group = useRef<Group>(null);
  const sprite = useRef<Mesh>(null);

  /* Un atlas par monture : le vélo n'est pas une couche posée par-dessus le
     sprite, c'est un autre dessin — sinon les jambes passeraient devant le
     cadre. Deux atlas de 64x64, la mémoire s'en moque. */
  const travel = useGameStore((s) => s.travel);
  /* La langue est lue par référence : la boucle de rendu tourne hors React et
     ne doit pas se réabonner à chaque image. */
  const { lang } = useLang();
  const langRef = useRef(lang);
  langRef.current = lang;
  const shadowDim = useGameStore((s) => AMBIENCE[s.phase].shadow);
  const atlas = useMemo(
    () => textureFromRaster(heroAtlas(LOOKS.player, travel === 'foot' ? 'none' : travel)),
    [travel],
  );
  const shadow = useMemo(() => textureFromRaster(heroShadowRaster()), []);

  useEffect(() => {
    // Une frame occupe un quart de l'atlas dans chaque direction.
    atlas.repeat.set(1 / HERO.cols, 1 / HERO.rows);
    return () => {
      atlas.dispose();
      shadow.dispose();
    };
  }, [atlas, shadow]);

  useFrame(() => {
    const now = performance.now();
    const s = useGameStore.getState();

    // Rien ne bouge tant que l'écran titre n'est pas franchi.
    if (!s.started) return;

    /* Une fiche ou un menu ouvert suspend le déplacement. On ne consomme
       surtout pas les entrées : c'est `useUiInput` qui les traite, et les
       avaler ici rendrait B inopérant dans les panneaux. */
    if (s.questId || s.techKey || s.menu) return;

    const intent = decide(
      { a: consumeA(), dir: heldDir() },
      {
        tile: s.tile,
        facing: s.facing,
        travel: s.travel,
        stepping: s.step !== null,
        dialogue: s.dialogue,
        lang: langRef.current,
      },
      map,
    );

    switch (intent.kind) {
      case 'reveal-line': s.revealLine(); break;
      case 'advance-dialogue': s.advanceDialogue(); break;
      case 'talk': s.openDialogue(intent.lines); break;
      case 'talk-npc':
        s.openDialogue(
          intent.npc.lines[langRef.current],
          intent.npc.menu,
          intent.npc.farewell?.[langRef.current],
        );
        break;
      case 'warp':
        /* La carte de destination est lue ici, pas dans le store : c'est le
           seul endroit qui sait vers quoi l'on part, et un intérieur descend
           de vélo. */
        s.warpTo(
          intent.warp.to,
          intent.warp.at,
          intent.warp.facing ?? 'down',
          getMap(intent.warp.to).interior,
        );
        break;
      case 'board':
        s.setTravel('boat');
        s.openDialogue(['Tu montes dans la barque.']);
        break;
      case 'disembark':
        s.setTravel('foot');
        s.beginStep(intent.to, now);
        break;
      case 'turn': s.face(intent.dir); break;
      case 'step':
        s.face(intent.dir);
        s.beginStep(intent.to, now);
        if (!s.muted) sfx.step();
        break;
      case 'idle': break;
    }

    // Position visuelle : interpolation du pas en cours, sinon position logique.
    const st = useGameStore.getState();
    const from = st.step ? st.step.from : st.tile;
    const stepMs = STEP_MS_BY_TRAVEL[st.travel];
    const t = st.step ? MathUtils.clamp((now - st.step.startedAt) / stepMs, 0, 1) : 1;
    playerVisual.set(
      MathUtils.lerp(from.x, st.tile.x, t),
      0,
      MathUtils.lerp(from.y, st.tile.y, t),
    );
    if (st.step && t >= 1) st.endStep();

    const g = group.current;
    if (g) g.position.copy(playerVisual);

    /* Frame de marche déduite de la parité de la case : deux pas consécutifs
       alternent forcément, sans compteur à maintenir. Colonne 0 au repos. */
    const col = st.step ? ((st.tile.x + st.tile.y) % 2 === 0 ? 1 : 3) : 0;
    atlas.offset.set(col / HERO.cols, 1 - (HERO_ROW[st.facing] + 1) / HERO.rows);
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[SHADOW_DX, SHADOW_Y, SHADOW_DZ]}>
        <planeGeometry args={[SHADOW_W, SHADOW_H]} />
        <meshBasicMaterial
          map={shadow}
          color={PALETTE.shadow}
          transparent
          opacity={SHADOW_OPACITY * shadowDim}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={sprite} position={[0, SPRITE_H / 2, 0]} rotation={[BILLBOARD_TILT, 0, 0]}>
        <planeGeometry args={[SPRITE_W, SPRITE_H]} />
        {/* alphaTest plutôt que transparent : pas de tri de transparence à gérer,
            et le sprite s'ordonne correctement avec le décor via le depth buffer. */}
        <meshBasicMaterial map={atlas} transparent alphaTest={0.5} />
      </mesh>
    </group>
  );
}
