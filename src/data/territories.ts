import type { Rect } from '@/game/engine/grid';

/**
 * Découpage du monde en territoires.
 *
 * Un territoire porte un nom et une ambiance sonore. Le premier rectangle qui
 * contient la case gagne : l'ordre compte, et le bourg — qui couvre tout —
 * ferme la liste en repli.
 */
export interface Territory {
  id: string;
  name: string;
  rect: Rect;
  track: string;
}

export const TERRITORIES: Territory[] = [
  { id: 'lab', name: 'Vallon du Labo', rect: { x: 1, y: 1, w: 41, h: 27 }, track: 'lab' },
  { id: 'island', name: 'Île des Trophées', rect: { x: 62, y: 1, w: 33, h: 29 }, track: 'hall' },
  { id: 'strait', name: 'Le Détroit', rect: { x: 56, y: 29, w: 39, h: 8 }, track: 'water' },
  { id: 'quests', name: 'Quartier des Quêtes', rect: { x: 1, y: 37, w: 38, h: 26 }, track: 'quests' },
  { id: 'stacks', name: 'Plateau des Stacks', rect: { x: 57, y: 37, w: 38, h: 26 }, track: 'stacks' },
  { id: 'village', name: 'Bourg', rect: { x: 1, y: 1, w: 94, h: 62 }, track: 'village' },
];

const inside = (r: Rect, x: number, y: number) =>
  x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h;

export const territoryAt = (x: number, y: number): Territory =>
  TERRITORIES.find((t) => inside(t.rect, x, y)) ?? TERRITORIES[TERRITORIES.length - 1];
