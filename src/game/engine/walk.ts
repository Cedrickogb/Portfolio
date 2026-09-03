import { isWalkable, type ParsedMap } from './grid';

/**
 * Déplacement libre, hors grille.
 *
 * Le monde entier se parcourt case par case : c'est ce qui donne la cadence du
 * jeu et ça se teste par des cases. Le hall en 3D, lui, se visite — on s'arrête
 * de biais devant une stèle, on longe un mur. Un pas de case y donnerait une
 * démarche de robot dans une salle d'exposition.
 *
 * Le personnage y est donc un carré de côté `2 × BODY_RADIUS` qui se déplace en
 * continu, et la collision se teste **un axe à la fois**. Cette séparation n'est
 * pas une optimisation : c'est elle qui produit le glissement le long des murs.
 * Testées ensemble, les deux composantes seraient annulées d'un bloc et le
 * moindre frottement contre un mur arrêterait net — sensation d'accrochage
 * caractéristique.
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Demi-largeur du personnage, en cases.
 *
 * Sous 0,5, il ne peut pas se coincer dans un angle ; au-delà, il ne passerait
 * plus dans une porte d'une case. 0,3 laisse le corps effleurer les murs sans
 * jamais les traverser.
 */
export const BODY_RADIUS = 0.3;

/** Vrai si un corps de ce rayon, centré ici, ne chevauche que du praticable. */
export function fits(map: ParsedMap, x: number, y: number, radius = BODY_RADIUS): boolean {
  // Les cases sont centrées sur les entiers : l'index se lit à l'arrondi.
  const x0 = Math.round(x - radius);
  const x1 = Math.round(x + radius);
  const y0 = Math.round(y - radius);
  const y1 = Math.round(y + radius);

  for (let ty = y0; ty <= y1; ty++) {
    for (let tx = x0; tx <= x1; tx++) {
      if (!isWalkable(map, tx, ty)) return false;
    }
  }
  return true;
}

/** Nouvelle position après un déplacement, murs compris. */
export function slide(map: ParsedMap, from: Point, dx: number, dy: number): Point {
  let x = from.x;
  let y = from.y;

  if (fits(map, x + dx, y)) x += dx;
  if (fits(map, x, y + dy)) y += dy;

  return { x, y };
}

/** Rayon de la caméra : plus fin que le corps, elle se glisse là où il passe. */
export const CAMERA_RADIUS = 0.22;

/**
 * Longueur de bras de caméra utilisable, en cases.
 *
 * À la 3e personne, la caméra est posée derrière le personnage. Sans cette
 * mesure, elle traverse le mur dès qu'on s'en approche à reculons : on se
 * retrouve à regarder la salle depuis l'extérieur, à travers la maçonnerie. On
 * recule donc pas à pas et on s'arrête avant l'obstacle — un ressort de caméra
 * qui se raccourcit, comme dans n'importe quel jeu à la 3e personne.
 *
 * Fonction pure : le pas de mesure et la marge sont les seuls réglages, et le
 * comportement se vérifie hors navigateur.
 */
export function boomLength(
  map: ParsedMap,
  x: number,
  y: number,
  dirX: number,
  dirY: number,
  max: number,
): number {
  const STEP = 0.12;
  let d = 0;
  while (d + STEP <= max) {
    if (!fits(map, x + dirX * (d + STEP), y + dirY * (d + STEP), CAMERA_RADIUS)) break;
    d += STEP;
  }
  return d;
}
