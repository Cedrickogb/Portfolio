'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { TILE_TEXELS, bufferRatio, pixelsPerTileFor, texelScaleFor } from '@/game/config';
import { useKeyboard } from '@/game/engine/input';
import { useSaveGame } from '@/game/engine/useSaveGame';
import { useGameAudio } from '@/game/audio/useGameAudio';
import { useUiInput } from '@/game/ui/useUiInput';
import FollowCamera from '@/game/engine/FollowCamera';
import Player from '@/game/entities/Player';
import TestWorld from '@/game/world/TestWorld';
import DialogueBox from '@/game/ui/DialogueBox';
import QuestPanel from '@/game/ui/QuestPanel';
import ListMenu from '@/game/ui/ListMenu';
import ContactPanel from '@/game/ui/ContactPanel';
import LabPanel from '@/game/ui/LabPanel';
import TechPanel from '@/game/ui/TechPanel';
import TrophyPanel from '@/game/ui/TrophyPanel';
import TerritoryBanner from '@/game/ui/TerritoryBanner';
import WorldMapPanel from '@/game/ui/WorldMapPanel';
import WarpFade from '@/game/ui/WarpFade';
import TitleScreen from '@/game/ui/TitleScreen';
import DebugHud from '@/game/ui/DebugHud';
import TouchControls from '@/game/ui/TouchControls';
import { getMap, validateWarps } from '@/data/maps';
import { useGameStore } from '@/game/store/useGameStore';

export default function Game() {
  const shell = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const mapId = useGameStore((s) => s.mapId);
  // La cohérence du réseau de téléportations est vérifiée une fois, au montage.
  useMemo(() => validateWarps(), []);
  const map = useMemo(() => getMap(mapId), [mapId]);

  useKeyboard();
  useUiInput();
  useSaveGame();
  useGameAudio();

  useLayoutEffect(() => {
    const el = shell.current;
    if (!el) return;
    /* Mesure immédiate : le premier callback de ResizeObserver n'est pas garanti
       (il dépend du cycle d'animation, donc pas livré si l'onglet est masqué).
       S'appuyer dessus pour le démarrage laisse le jeu bloqué en 0x0. */
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ width: r.width, height: r.height });
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  /* Cœur du rendu pixel : l'échelle des texels est un entier déduit de la
     largeur disponible, et le tampon un multiple entier de la taille CSS. Rien
     n'est donc jamais réétiré d'un facteur fractionnaire — c'est ce qui garde
     les arêtes franches, à n'importe quelle taille de fenêtre. */
  const dpr = bufferRatio();
  const scale = texelScaleFor(size.width);
  const pixelsPerTile = pixelsPerTileFor(size.width);
  const visibleTiles = size.width > 0 ? (size.width / pixelsPerTile).toFixed(1) : '0';
  const buffer = `${Math.round(size.width * dpr)}x${Math.round(size.height * dpr)} ·x${scale} ·${visibleTiles} tuiles`;

  return (
    <div ref={shell} className="game-canvas relative w-screen h-[100dvh] overflow-hidden bg-black">
      {/* r3f mesure lui-même son conteneur (react-use-measure) et exclut
          volontairement `size` de ses props côté web : on ne lui impose donc pas
          la taille. Notre propre mesure ne sert qu'à calculer le dpr et à ne
          monter le canvas qu'une fois le conteneur dimensionné. */}
      {size.width > 0 && (
        <Canvas flat dpr={dpr} gl={{ antialias: false }}>
          {/* Aucune lumière dans la scène : toutes les couleurs sont cuites, soit
              dans les textures, soit dans l'attribut `color` des géométries. */}
          <FollowCamera dpr={dpr} pixelsPerTile={pixelsPerTile} bounds={{ width: map.width, height: map.height }} />
          <TestWorld map={map} />
          <Player map={map} />
        </Canvas>
      )}

      {/* Habillage CRT, repris tel quel des styles déjà écrits pour le site. */}
      <div className="crt-effect pointer-events-none absolute inset-0 z-10" aria-hidden />
      <div className="scan-line-anim" aria-hidden />

      <DebugHud buffer={buffer} />
      <DialogueBox />
      <ListMenu />
      <ContactPanel />
      <LabPanel />
      <QuestPanel />
      <TechPanel />
      <TrophyPanel />
      <TerritoryBanner />
      <WorldMapPanel />
      <WarpFade />
      <TouchControls />
      <TitleScreen />

      <div className="pointer-events-none absolute top-2 right-2 z-30 flex flex-col items-end gap-2">
        <Link
          href="/"
          className="pointer-events-auto font-display text-[10px] bg-gray-900/80 border-2 border-gray-600 px-3 py-2 text-gray-200 hover:text-primary hover:border-primary transition-colors"
        >
          ← Site
        </Link>
        <p className="hidden sm:block font-mono text-sm text-gray-400 bg-black/50 px-2 py-1 text-right">
          Flèches / ZQSD / WASD : marcher<br />
          A, Entrée ou Espace : parler
        </p>
      </div>
    </div>
  );
}
