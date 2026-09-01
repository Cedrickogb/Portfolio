'use client';

import type { PointerEvent as ReactPointerEvent } from 'react';
import { pressA, pressB, pressDir, releaseDir } from '@/game/engine/input';
import type { Direction } from '@/game/engine/direction';

const PAD_BTN =
  'flex items-center justify-center bg-gray-900/70 border-2 border-gray-500 text-gray-200 font-display text-xs select-none active:bg-primary active:text-black';

function DirButton({ dir, label, className }: { dir: Direction; label: string; className: string }) {
  // On relâche aussi sur cancel et leave : sans ça, glisser hors du bouton
  // laisse la direction bloquée et le joueur part en marche forcée.
  const down = (e: ReactPointerEvent) => {
    e.preventDefault();
    pressDir(dir);
  };
  const up = () => releaseDir(dir);

  return (
    <button
      type="button"
      aria-label={dir}
      className={`${PAD_BTN} ${className}`}
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={up}
    >
      {label}
    </button>
  );
}

/** Superposition tactile. Masquée sur pointeur fin (voir .game-touch dans globals.css). */
export default function TouchControls() {
  return (
    <div className="game-touch pointer-events-none absolute inset-0 z-20">
      <div className="pointer-events-auto absolute bottom-4 left-4 grid grid-cols-3 grid-rows-3 gap-1 w-36 h-36">
        <DirButton dir="up" label="▲" className="col-start-2 row-start-1" />
        <DirButton dir="left" label="◀" className="col-start-1 row-start-2" />
        <DirButton dir="right" label="▶" className="col-start-3 row-start-2" />
        <DirButton dir="down" label="▼" className="col-start-2 row-start-3" />
      </div>

      <div className="pointer-events-auto absolute bottom-6 right-4 flex items-end gap-3">
        <button
          type="button"
          aria-label="B"
          className={`${PAD_BTN} w-12 h-12 rounded-full`}
          onPointerDown={(e) => { e.preventDefault(); pressB(); }}
        >
          B
        </button>
        <button
          type="button"
          aria-label="A"
          className={`${PAD_BTN} w-16 h-16 rounded-full`}
          onPointerDown={(e) => { e.preventDefault(); pressA(); }}
        >
          A
        </button>
      </div>
    </div>
  );
}
