'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { TILE_TEXELS, bufferRatio, pixelsPerTileFor, texelScaleFor } from '@/game/config';
import { flushInput, useKeyboard } from '@/game/engine/input';
import { useSaveGame } from '@/game/engine/useSaveGame';
import { useGameAudio } from '@/game/audio/useGameAudio';
import { useDayNight } from '@/game/world/useDayNight';
import { useUiInput } from '@/game/ui/useUiInput';
import FollowCamera from '@/game/engine/FollowCamera';
import Player from '@/game/entities/Player';
import TestWorld from '@/game/world/TestWorld';
import HallScene from '@/game/world/hall/HallScene';
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
import { useT } from '@/i18n/LangProvider';

export default function Game() {
  const t = useT();
  const shell = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const mapId = useGameStore((s) => s.mapId);
  // La cohérence du réseau de téléportations est vérifiée une fois, au montage.
  useMemo(() => validateWarps(), []);
  const map = useMemo(() => getMap(mapId), [mapId]);
  /* Le hall se visite en 3D. La carte le déclare, le composant n'a rien à
     savoir de son nom — un deuxième lieu en volume ne demandera qu'un drapeau
     de plus dans la donnée. */
  const spatial = map.spatial;

  useKeyboard();

  /* Changer de mode de rendu change le *sens* des touches : en vue de dessus,
     ↑ va vers le nord ; dans une salle en volume, ↑ avance dans la direction du
     regard. Une touche encore enfoncée au moment du basculement se retrouve
     donc réinterprétée — en sortant du hall vers le sud, la même touche
     signifiait « nord » et ramenait aussitôt le visiteur à l'intérieur. On vide
     la file : le premier pas dans le nouveau mode demande une vraie pression. */
  useEffect(() => {
    flushInput();
  }, [spatial]);
  useUiInput();
  useSaveGame();
  useGameAudio();
  useDayNight();

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
          {/* Deux rendus, un seul monde.
              En vue de dessus, aucune lumière dans la scène : toutes les
              couleurs sont cuites, dans les textures ou dans l'attribut
              `color` des géométries — c'est ce qui garde les pixels exacts.
              Le hall, lui, est une salle en perspective réellement éclairée.
              Le contraste est le propos : on pousse une porte et le jeu change
              de nature. */}
          {spatial ? (
            <HallScene map={map} />
          ) : (
            <>
              <FollowCamera
                dpr={dpr}
                pixelsPerTile={pixelsPerTile}
                bounds={{ width: map.width, height: map.height }}
              />
              <TestWorld map={map} />
              <Player map={map} />
            </>
          )}
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
          {t('game.back')}
        </Link>
        {/* Les commandes changent avec le lieu : dans une salle en volume, les
            flèches latérales font pivoter au lieu de translater. Afficher la
            notice de la vue de dessus y serait un contresens. */}
        <p className="hidden sm:block font-mono text-sm text-gray-400 bg-black/50 px-2 py-1 text-right">
          {spatial ? (
            <>
              {t('hint.move3d')}<br />
              {t('hint.look3d')}<br />
              {t('hint.view3d')}
            </>
          ) : (
            <>
              {t('hint.walk')}<br />
              {t('hint.talk')}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
