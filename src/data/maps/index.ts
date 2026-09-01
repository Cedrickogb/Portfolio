import { TOWN_MAP } from './town-map';
import { CONTACT_INTERIOR, LAB_INTERIOR, QUESTS_INTERIOR, STACKS_INTERIOR } from './interiors';
import { parseMap, tileKey, type GameMap, type ParsedMap } from '@/game/engine/grid';

/** Toutes les cartes du jeu, indexées par identifiant. */
export const MAPS: Record<string, GameMap> = {
  town: TOWN_MAP,
  lab: LAB_INTERIOR,
  quests: QUESTS_INTERIOR,
  stacks: STACKS_INTERIOR,
  contact: CONTACT_INTERIOR,
};

export const DEFAULT_MAP = 'town';

const cache = new Map<string, ParsedMap>();

/** Carte analysée, mise en cache : l'analyse ne se refait pas à chaque entrée. */
export function getMap(id: string): ParsedMap {
  const cached = cache.get(id);
  if (cached) return cached;

  const raw = MAPS[id];
  if (!raw) throw new Error(`Carte « ${id} » inconnue`);
  const parsed = parseMap(raw);
  cache.set(id, parsed);
  return parsed;
}

/**
 * Vérifie la cohérence du réseau de téléportations.
 *
 * Une destination qui pointe vers une carte inexistante, vers une case
 * infranchissable, ou pire — vers une autre case de téléportation, ce qui
 * enfermerait le joueur dans un aller-retour sans fin — sont trois pannes que
 * rien ne signale à l'exécution. On les attrape au chargement.
 */
export function validateWarps(): void {
  for (const [id, raw] of Object.entries(MAPS)) {
    const from = parseMap(raw);
    for (const [key, warp] of Object.entries(from.warps)) {
      const target = MAPS[warp.to];
      if (!target) {
        throw new Error(`Téléportation ${id}:${key} vers la carte inconnue « ${warp.to} »`);
      }
      const dest = parseMap(target);
      const { x, y } = warp.at;
      if (x < 0 || y < 0 || x >= dest.width || y >= dest.height) {
        throw new Error(`Téléportation ${id}:${key} : arrivée ${x},${y} hors de « ${warp.to} »`);
      }
      if (dest.kinds[y][x] === 'wall' || dest.kinds[y][x] === 'building') {
        throw new Error(`Téléportation ${id}:${key} : arrivée ${x},${y} dans un ${dest.kinds[y][x]}`);
      }
      if (dest.warps[tileKey(x, y)]) {
        throw new Error(
          `Téléportation ${id}:${key} : l'arrivée ${x},${y} est elle-même une téléportation — aller-retour sans fin`,
        );
      }
    }
  }
}
