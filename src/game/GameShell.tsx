'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/game/GameErrorBoundary';
import HeroWalkLoader from '@/game/ui/HeroWalkLoader';
import { PROFILE } from '@/data/constants';
import { useT, useTr } from '@/i18n/LangProvider';

/**
 * Écran de chargement du bundle.
 *
 * Avant que `Game` (three.js compris) ne soit téléchargé, il n'y a encore ni
 * store ni écran titre — juste ce composant. Un point qui clignote sur fond
 * noir rompt le thème une image avant que l'écran titre, lui, ne le tienne :
 * le visiteur voit un flash générique puis un logo, deux écrans qui ne se
 * ressemblent pas. Celui-ci reprend le même habillage (logo, fiche, teinte)
 * pour qu'il n'y ait qu'un seul écran de chargement, pas deux qui se
 * succèdent sans lien.
 *
 * Le héros qui traverse l'écran en boucle (`HeroWalkLoader`) fait le même
 * travail qu'un sablier, mais dans le thème : c'est le même sprite que celui
 * qu'on va bientôt diriger, avant même que le moteur qui le rend jouable soit
 * arrivé.
 */
function GameLoading() {
  const t = useT();
  const tr = useTr();
  return (
    <div className="w-screen h-[100dvh] flex flex-col items-center justify-center gap-6 bg-battle-bg-dark px-6 text-center">
      <div className="space-y-3">
        <h1 className="font-display text-2xl leading-tight text-primary drop-shadow-[3px_3px_0_rgba(0,0,0,1)] sm:text-4xl">
          Uppercase<span className="text-white">+</span>
        </h1>
      </div>
      <HeroWalkLoader />
      <p className="font-display text-[10px] text-gray-500 animate-pulse">{t('game.loading')}</p>
    </div>
  );
}

/* Le moteur est chargé uniquement côté client : three.js n'a rien à faire dans
   le rendu serveur, et ce découpage garantit que le site classique ne paie
   jamais le poids du jeu. */
const Game = dynamic(() => import('@/game/Game'), {
  ssr: false,
  loading: GameLoading,
});

export default function GameShell() {
  const t = useT();
  return (
    <GameErrorBoundary labels={{ crashed: t('game.crashed'), back: t('game.back') }}>
      <Game />
    </GameErrorBoundary>
  );
}
