import type { ReactNode } from 'react';

/**
 * Fenêtre de jeu : le cadre commun à tous les panneaux.
 *
 * Les premières versions du StackDex et des fiches étaient des modales web
 * génériques posées sur un jeu en pixel art — fond gris, séparateurs pointillés,
 * texte en police d'interface. Elles n'avaient ni le cadre, ni la typographie,
 * ni le vocabulaire du reste. Ce composant centralise les trois : double
 * bordure épaisse, cartouches d'angle vertes, titre en Press Start 2P et barre
 * d'aide en bas, comme les fenêtres de menu d'une console portable.
 */
export default function GameWindow({
  title,
  hint,
  children,
  width = 'max-w-2xl',
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  width?: string;
}) {
  return (
    <div className={`pixel-border relative w-full ${width} border-4 border-battle-border-dark bg-battle-bg-dark`}>
      {/* Cartouches d'angle : le motif déjà utilisé sur la carte personnage du site. */}
      <span className="absolute -left-1 -top-1 z-10 h-2 w-2 bg-primary" />
      <span className="absolute -right-1 -top-1 z-10 h-2 w-2 bg-primary" />
      <span className="absolute -bottom-1 -left-1 z-10 h-2 w-2 bg-primary" />
      <span className="absolute -bottom-1 -right-1 z-10 h-2 w-2 bg-primary" />

      {/* Pas de `uppercase` : Press Start 2P n'a pas les majuscules accentuées,
          et « Quêtes » y devenait « QUêTES », le É retombant en police de
          secours. Les titres sont donc écrits dans la casse voulue. */}
      <header className="flex items-center gap-3 border-b-2 border-battle-border-dark bg-battle-panel-dark px-4 py-3">
        <span className="h-3 w-3 shrink-0 bg-primary" />
        <h2 className="font-display text-[10px] tracking-widest text-primary sm:text-xs">
          {title}
        </h2>
      </header>

      <div className="p-4 sm:p-5">{children}</div>

      {hint && (
        <footer className="border-t-2 border-battle-border-dark bg-battle-panel-dark px-4 py-2 text-right font-mono text-lg text-gray-400">
          {hint}
        </footer>
      )}
    </div>
  );
}
