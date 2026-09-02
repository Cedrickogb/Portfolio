import { QUESTS, TECH_LIST } from '@/data/constants';
import type { MenuKind } from '@/game/store/useGameStore';

/**
 * Contenu des menus de comptoir, en un seul endroit.
 *
 * La liste sert à deux consommateurs : le composant qui l'affiche et le
 * gestionnaire d'entrée qui déplace le curseur et valide. Les faire diverger
 * — une entrée visible mais non sélectionnable, ou l'inverse — serait invisible
 * jusqu'au premier bug de sélection.
 */
export const questEntries = () => QUESTS.filter((q) => q.active);
export const techEntries = () => TECH_LIST;

/**
 * Entrées du menu START.
 *
 * Déclarées ici avec les listes de contenu : le gestionnaire d'entrée et le
 * composant d'affichage lisent la même source, donc une entrée visible est
 * toujours sélectionnable.
 */
export const START_ENTRIES = [
  { id: 'quests', label: 'Journal de quêtes' },
  { id: 'stacks', label: 'StackDex' },
  { id: 'cv', label: 'Fiche & CV' },
  { id: 'map', label: 'Carte du monde' },
  { id: 'bike', label: 'Vélo' },
  { id: 'sound', label: 'Son' },
  { id: 'classic', label: 'Mode classique' },
  { id: 'reset', label: 'Nouvelle partie' },
] as const;

export type StartEntryId = (typeof START_ENTRIES)[number]['id'];

/** Nombre d'entrées navigables. Les menus sans liste renvoient 0. */
export function menuLength(menu: MenuKind | null): number {
  if (menu === 'quests') return questEntries().length;
  if (menu === 'stacks') return techEntries().length;
  if (menu === 'start') return START_ENTRIES.length;
  return 0;
}

/** Identifiant de l'entrée à un index donné, ou null hors liste. */
export function menuEntryId(menu: MenuKind | null, index: number): string | null {
  if (menu === 'quests') return questEntries()[index]?.id ?? null;
  if (menu === 'stacks') return techEntries()[index]?.key ?? null;
  if (menu === 'start') return START_ENTRIES[index]?.id ?? null;
  return null;
}

/** Colonnes de la grille du StackDex. Les listes simples restent sur une colonne. */
export const menuColumns = (menu: MenuKind | null): number => (menu === 'stacks' ? 3 : 1);
