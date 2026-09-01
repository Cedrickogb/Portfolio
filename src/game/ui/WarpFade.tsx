'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/game/store/useGameStore';

/**
 * Fondu au noir sur changement de carte.
 *
 * Sans lui, franchir une porte fait sauter l'image d'un décor à l'autre sans
 * transition — on croit à un bug d'affichage plutôt qu'à un déplacement.
 */
export default function WarpFade() {
  const mapId = useGameStore((s) => s.mapId);
  const [opaque, setOpaque] = useState(false);

  useEffect(() => {
    setOpaque(true);
    const id = window.setTimeout(() => setOpaque(false), 90);
    return () => window.clearTimeout(id);
  }, [mapId]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[45] bg-black transition-opacity duration-200 ${
        opaque ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
