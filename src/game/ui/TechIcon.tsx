import type { TechItem } from '@/data/types';

/**
 * Icône d'une technologie.
 *
 * `TECH_DATA` couvre deux cas : les technos qui ont une icône Font Awesome, et
 * celles qui n'en ont pas et se replient sur un symbole textuel (« TS », « N »).
 * Les deux passent par ce composant pour que cartes et fiche restent alignées.
 */
export default function TechIcon({ tech, className = '' }: { tech: TechItem; className?: string }) {
  const label = tech.textSymbol ?? tech.name.slice(0, 2).toUpperCase();

  if (tech.isTextIcon || !tech.iconClass) {
    return (
      <span className={`${tech.color} font-display leading-none ${className}`} aria-hidden>
        {label}
      </span>
    );
  }
  return <i className={`${tech.iconClass} ${tech.color} ${className}`} aria-hidden />;
}
