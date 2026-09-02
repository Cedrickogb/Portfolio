'use client';

import { useEffect, useRef, useState } from 'react';
import { territoryAt } from '@/data/territories';
import { setTrack } from '@/game/audio';
import { useGameStore } from '@/game/store/useGameStore';

/**
 * Bandeau de territoire, et bascule de la musique.
 *
 * Sur une carte de cette taille, franchir une frontière invisible sans rien
 * qui le dise donne l'impression d'errer. Le nom s'affiche brièvement, la
 * musique change — et l'un explique l'autre.
 *
 * Ne s'applique qu'à l'extérieur : un intérieur garde l'ambiance du territoire
 * où il se trouve, sinon entrer dans une boutique couperait la musique.
 */
export default function TerritoryBanner() {
  const started = useGameStore((s) => s.started);
  const muted = useGameStore((s) => s.muted);
  const mapId = useGameStore((s) => s.mapId);
  const tile = useGameStore((s) => s.tile);
  const [shown, setShown] = useState<string | null>(null);
  const previous = useRef<string | null>(null);

  const outside = mapId === 'world';
  const territory = outside ? territoryAt(tile.x, tile.y) : null;

  useEffect(() => {
    if (!started || !territory || territory.id === previous.current) return;
    previous.current = territory.id;
    if (!muted) setTrack(territory.track);

    setShown(territory.name);
    const id = window.setTimeout(() => setShown(null), 2600);
    return () => window.clearTimeout(id);
  }, [started, territory, muted]);

  if (!shown) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-16 z-30 flex justify-center">
      <p className="pixel-border animate-fade-in border-4 border-battle-border-dark bg-battle-bg-dark/95 px-6 py-3 font-display text-[10px] tracking-widest text-primary sm:text-xs">
        {shown}
      </p>
    </div>
  );
}
