import type { TechItem } from '@/data/types';

interface TechIconProps {
  tech: TechItem;
  /** Format réduit : vignettes de liste et cartes du jeu. */
  mini?: boolean;
  /** Classes de taille supplémentaires, quand l'appelant impose son gabarit. */
  className?: string;
}

/**
 * Icône d'une technologie, en trois formes possibles.
 *
 * Composant unique partagé par le site classique et le jeu : c'était le but du
 * regroupement des icônes, et garder deux implémentations les aurait fait
 * diverger au premier ajout.
 *
 * `tech.color` est déjà une classe complète (`text-vue`), donc on l'applique
 * telle quelle — la composer en `dark:text-${tech.color}` produisait
 * `dark:text-text-vue`, une classe qui n'existe pas et que Tailwind ne génère
 * jamais.
 */
export default function TechIcon({ tech, mini = false, className = '' }: TechIconProps) {
  const { icon } = tech;
  const motion = 'text-center items-center transition-transform duration-300 group-hover:scale-110';

  if (icon.type === 'fontawesome') {
    return (
      <i
        className={`${icon.value} ${tech.color} ${motion} ${className || (mini ? 'text-3xl' : 'text-5xl')}`}
        aria-hidden="true"
      />
    );
  }

  if (icon.type === 'text') {
    return (
      <span
        className={`font-display font-bold leading-none ${tech.color} ${motion} ${
          className || (mini ? 'text-xl' : 'text-3xl')
        }`}
        aria-hidden="true"
      >
        {icon.value}
      </span>
    );
  }

  /* Branche `svg` : l'union discriminée garantit la présence du composant, il
     n'y a donc plus de cas `undefined` à gérer. */
  const Icon = icon.component;
  return (
    <Icon
      className={`${tech.color} ${motion} ${className || (mini ? 'w-7 h-7' : 'w-10 h-10')}`}
      aria-hidden="true"
    />
  );
}
