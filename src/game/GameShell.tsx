'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/game/GameErrorBoundary';
import { useT } from '@/i18n/LangProvider';

/* Le moteur est chargé uniquement côté client : three.js n'a rien à faire dans
   le rendu serveur, et ce découpage garantit que le site classique ne paie
   jamais le poids du jeu. */
const Game = dynamic(() => import('@/game/Game'), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-[100dvh] flex items-center justify-center bg-black">
      <p className="font-display text-xs text-primary animate-pulse">…</p>
    </div>
  ),
});

export default function GameShell() {
  const t = useT();
  return (
    <GameErrorBoundary labels={{ crashed: t('game.crashed'), back: t('game.back') }}>
      <Game />
    </GameErrorBoundary>
  );
}
