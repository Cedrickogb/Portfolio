'use client';

import { useEffect, useMemo } from 'react';
import { CAMERA_OFFSET, SHADOW_OPACITY, SHADOW_Y, TILE_TEXELS, shadowOffset } from '@/game/config';
import { HERO, HERO_HEIGHT, HERO_ROW, HERO_SHADOW_H, HERO_SHADOW_W, heroAtlas, heroShadowRaster, lookOf } from '@/game/assets/hero';
import { PALETTE } from '@/game/assets/palette';
import { textureFromRaster } from '@/game/assets/texture';
import type { NpcSpec, Tile } from '@/game/engine/grid';

const BILLBOARD_TILT = -Math.atan2(CAMERA_OFFSET[1], CAMERA_OFFSET[2]);
const SPRITE_W = HERO.frameW / TILE_TEXELS;
const SPRITE_H = HERO.frameH / TILE_TEXELS;
const SHADOW_W = HERO_SHADOW_W / TILE_TEXELS;
const SHADOW_H = HERO_SHADOW_H / TILE_TEXELS;
const [SHADOW_DX, SHADOW_DZ] = shadowOffset(HERO_HEIGHT);

/**
 * Personnage non joueur.
 *
 * Aucun sprite supplémentaire à dessiner : le héros est produit par une
 * fonction, donc un PNJ n'est que le même dessin avec un autre jeu de
 * couleurs. Il reste sur sa frame de repos — l'animer n'apporterait rien
 * derrière un comptoir, et coûterait une boucle par personnage.
 */
export default function Npc({ tile, spec }: { tile: Tile; spec: NpcSpec }) {
  const look = lookOf(spec.look);

  const atlas = useMemo(() => textureFromRaster(heroAtlas(look)), [look]);
  const shadow = useMemo(() => textureFromRaster(heroShadowRaster()), []);

  useEffect(() => {
    atlas.repeat.set(1 / HERO.cols, 1 / HERO.rows);
    atlas.offset.set(0, 1 - (HERO_ROW[spec.facing ?? 'down'] + 1) / HERO.rows);
    return () => {
      atlas.dispose();
      shadow.dispose();
    };
  }, [atlas, shadow, spec.facing]);

  return (
    <group position={[tile.x, 0, tile.y]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[SHADOW_DX, SHADOW_Y, SHADOW_DZ]}>
        <planeGeometry args={[SHADOW_W, SHADOW_H]} />
        <meshBasicMaterial
          map={shadow}
          color={PALETTE.shadow}
          transparent
          opacity={SHADOW_OPACITY}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, SPRITE_H / 2, 0]} rotation={[BILLBOARD_TILT, 0, 0]}>
        <planeGeometry args={[SPRITE_W, SPRITE_H]} />
        <meshBasicMaterial map={atlas} transparent alphaTest={0.5} />
      </mesh>
    </group>
  );
}
