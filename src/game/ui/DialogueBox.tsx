'use client';

import { useEffect } from 'react';
import { pressA } from '@/game/engine/input';
import { useGameStore } from '@/game/store/useGameStore';

const CHAR_MS = 26;

export default function DialogueBox() {
  const dialogue = useGameStore((s) => s.dialogue);
  const tickReveal = useGameStore((s) => s.tickReveal);

  const line = dialogue ? dialogue.lines[dialogue.index] : '';
  const done = dialogue ? dialogue.revealed >= line.length : true;

  useEffect(() => {
    if (!dialogue || done) return;
    const id = window.setInterval(tickReveal, CHAR_MS);
    return () => window.clearInterval(id);
  }, [dialogue, done, tickReveal]);

  if (!dialogue) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-3 sm:p-6">
      {/* Cliquer dans la boîte revient à presser A : même chemin d'entrée. */}
      <button
        type="button"
        onClick={pressA}
        aria-live="polite"
        className="pointer-events-auto block w-full max-w-3xl mx-auto text-left bg-white/95 dark:bg-gray-900/95 border-4 border-gray-300 dark:border-gray-600 pixel-border p-4 sm:p-6"
      >
        <p className="font-display text-[10px] sm:text-xs leading-relaxed text-gray-900 dark:text-white min-h-[3.5rem]">
          {line.slice(0, dialogue.revealed)}
          {!done && <span className="cursor-blink">_</span>}
        </p>
        <div className="mt-3 flex items-center justify-end gap-2 font-mono text-sm text-gray-500">
          <span>
            {dialogue.index + 1}/{dialogue.lines.length}
          </span>
          {done && <span className="animate-pulse text-primary">▼</span>}
        </div>
      </button>
    </div>
  );
}
