import type { Metadata } from 'next';
import GameShell from '@/game/GameShell';

export const metadata: Metadata = {
  title: 'Uppercase+ — Prototype',
  /* Le jeu n'est pas indexable : tout le contenu référencé vit côté site
     classique, en HTML rendu au serveur. */
  robots: { index: false, follow: false },
};

export default function GamePage() {
  return <GameShell />;
}
