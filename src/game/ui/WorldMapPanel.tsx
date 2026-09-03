'use client';

import { useEffect, useMemo, useRef } from 'react';
import { TERRITORIES } from '@/data/territories';
import { getMap } from '@/data/maps';
import { PALETTE } from '@/game/assets/palette';
import type { TileKind } from '@/game/engine/grid';
import { useGameStore } from '@/game/store/useGameStore';
import { useT } from '@/i18n/LangProvider';
import GameWindow from './GameWindow';

/**
 * Carte du monde.
 *
 * Elle est peinte à partir de la carte réelle, une case par pixel : la vignette
 * ne peut donc pas mentir sur la géographie — elle *est* la géographie. Un plan
 * dessiné à la main deviendrait faux au premier remaniement de terrain.
 *
 * Un canvas plutôt que des éléments : à 96x64, une grille HTML demandait plus
 * de six mille nœuds pour une image qui ne bouge jamais.
 */
const TINT: Partial<Record<TileKind, string>> = {
  grass: PALETTE.grass,
  moor: PALETTE.moor,
  rock: PALETTE.rock,
  cliff: PALETTE.rockDark,
  sand: PALETTE.sand,
  tall: PALETTE.tallGrassDark,
  flower: PALETTE.flowerRed,
  path: PALETTE.dirt,
  plaza: PALETTE.stoneLight,
  wood: PALETTE.wood,
  water: PALETTE.water,
  dock: PALETTE.woodDark,
  wall: PALETTE.stoneDark,
  prop: PALETTE.tallGrassDark,
  building: PALETTE.roofRed,
  door: PALETTE.primaryLight,
  sign: PALETTE.wallHi,
  counter: PALETTE.wood,
  npc: PALETTE.skin,
  trophy: PALETTE.roofCopper,
};

/** Pixels d'écran par case. */
const CELL = 5;

export default function WorldMapPanel() {
  const menu = useGameStore((s) => s.menu);
  const mapId = useGameStore((s) => s.mapId);
  const tile = useGameStore((s) => s.tile);
  const canvas = useRef<HTMLCanvasElement>(null);
  const t = useT();

  const world = useMemo(() => getMap('world'), []);
  const outside = mapId === 'world';

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;

    const image = ctx.createImageData(world.width, world.height);
    const rgb = (hex: string): [number, number, number] => [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];
    const cache = new Map<string, [number, number, number]>();

    for (let y = 0; y < world.height; y++) {
      for (let x = 0; x < world.width; x++) {
        const hex = TINT[world.kinds[y][x]] ?? PALETTE.grass;
        let c = cache.get(hex);
        if (!c) { c = rgb(hex); cache.set(hex, c); }
        const i = (y * world.width + x) * 4;
        image.data[i] = c[0];
        image.data[i + 1] = c[1];
        image.data[i + 2] = c[2];
        image.data[i + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
  }, [world, menu]);

  if (menu !== 'map') return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/85 p-3 sm:p-6">
      <GameWindow title={t('panel.map.title')} hint={t('panel.close.b')} width="max-w-4xl">
        <div className="overflow-auto">
          <div
            className="relative mx-auto"
            style={{ width: world.width * CELL, height: world.height * CELL }}
          >
            <canvas
              ref={canvas}
              width={world.width}
              height={world.height}
              className="absolute inset-0 h-full w-full"
              /* Sans cela, l'agrandissement interpole et la carte devient floue :
                 tout le reste du jeu est en pixels nets. */
              style={{ imageRendering: 'pixelated' }}
            />

            {TERRITORIES.filter((territory) => territory.id !== 'village').map((territory) => (
              <span
                key={territory.id}
                className="pointer-events-none absolute whitespace-nowrap border border-black/60 bg-black/75 px-1 font-display text-[7px] leading-4 text-primary-light"
                style={{
                  left: (territory.rect.x + territory.rect.w / 2) * CELL,
                  top: (territory.rect.y + territory.rect.h / 2) * CELL,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {t(territory.nameKey)}
              </span>
            ))}

            {/* Position du joueur, seulement quand il est dehors : à l'intérieur
                d'un bâtiment, un point sur la carte serait un mensonge. */}
            {outside && (
              <span
                className="pointer-events-none absolute animate-pulse border border-black bg-hp-red"
                style={{
                  left: tile.x * CELL - 2,
                  top: tile.y * CELL - 2,
                  width: CELL + 4,
                  height: CELL + 4,
                }}
              />
            )}
          </div>
        </div>

        <p className="mt-3 font-mono text-lg text-gray-400">
          {outside
            ? 'Le point rouge, c’est toi.'
            : 'Tu es à l’intérieur d’un bâtiment.'}
        </p>
      </GameWindow>
    </div>
  );
}
