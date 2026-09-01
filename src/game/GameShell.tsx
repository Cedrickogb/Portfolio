'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/game/GameErrorBoundary';

/* Le moteur est chargé uniquement côté client : three.js n'a rien à faire dans
   le rendu serveur, et ce découpage garantit que le site classique ne paie
   jamais le poids du jeu. */
const Game = dynamic(() => import('@/game/Game'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-[100dvh] flex items-center justify-center bg-black">
      <p className="font-display text-xs text-primary animate-pulse">CHARGEMENT…</p>
    </div>
  ),
});

export default function GameShell() {
  return (
    <GameErrorBoundary>
      <Game />
    </GameErrorBoundary>
  );
}
