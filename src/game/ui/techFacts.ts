import type { TechItem } from '@/data/types';
import type { Lang } from '@/i18n/lang';

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

/* La marque de l'attaque spéciale est bilingue elle aussi, puisque les
   descriptions le sont : « Special Move: » côté anglais, « Attaque
   spéciale : » côté français. */
const MOVE: Record<Lang, RegExp> = {
  en: /special move\s*:\s*([^.]+)\.?/i,
  fr: /attaque sp[ée]ciale\s*:\s*([^.]+)\.?/i,
};

/** Années de pratique. Indépendant de la langue : les chiffres ne se traduisent pas. */
export function techYears(tech: TechItem): number {
  const numbers = tech.stats.experience.match(/\d+/g)?.map(Number) ?? [];
  return numbers.length ? Math.max(...numbers) : 0;
}

export function techFacts(tech: TechItem, lang: Lang): TechFacts {
  const description = tech.description[lang];
  const found = MOVE[lang].exec(description);
  return {
    years: techYears(tech),
    description: found ? description.replace(found[0], '').trim() : description,
    move: found ? found[1].trim() : null,
  };
}

/** Échelle des jauges : la plus longue expérience du portfolio fait le maximum. */
export const yearsScale = (techs: TechItem[]): number =>
  Math.max(1, ...techs.map(techYears));
