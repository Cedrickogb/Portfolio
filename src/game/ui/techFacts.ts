import type { TechItem } from '@/data/types';

/**
 * Lecture des chiffres et de l'« attaque spéciale » cachés dans `TECH_DATA`.
 *
 * Chaque description se termine déjà par « Special Move: … » — une donnée
 * écrite pour le site classique, jamais exploitée. On la sort du texte pour la
 * mettre en valeur, plutôt que d'ajouter un champ que Cédrick devrait remplir.
 */
export interface TechFacts {
  /** Années de pratique, borne haute quand la donnée est une fourchette. */
  years: number;
  /** Description sans la mention d'attaque spéciale. */
  description: string;
  /** Nom de l'attaque spéciale, si la description en annonce une. */
  move: string | null;
}

const MOVE = /special move\s*:\s*([^.]+)\.?/i;

export function techFacts(tech: TechItem): TechFacts {
  const numbers = tech.stats.exp.match(/\d+/g)?.map(Number) ?? [];
  const years = numbers.length ? Math.max(...numbers) : 0;

  const found = MOVE.exec(tech.desc);
  return {
    years,
    description: found ? tech.desc.replace(found[0], '').trim() : tech.desc,
    move: found ? found[1].trim() : null,
  };
}

/** Échelle des jauges : la plus longue expérience du portfolio fait le maximum. */
export const yearsScale = (techs: TechItem[]): number =>
  Math.max(1, ...techs.map((t) => techFacts(t).years));
