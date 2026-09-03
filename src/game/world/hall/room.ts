import { BoxGeometry, BufferAttribute, Color, PlaneGeometry, type BufferGeometry } from 'three';
import { GLYPH_H, fontSafe, textRaster, textWidth } from '@/game/assets/font';
import { PALETTE as P } from '@/game/assets/palette';
import { blit, createRaster, fillRect, type Raster } from '@/game/assets/raster';

/**
 * Géométries et textures propres au hall en 3D.
 *
 * Le reste du jeu cuit ses couleurs dans les sommets parce qu'aucune lumière
 * n'existe : c'est ce qui garde les pixels exacts. Ici, au contraire, la salle
 * est éclairée pour de vrai — c'est tout l'intérêt de passer en 3D. Les
 * matériaux sont donc lambertiens et les couleurs viennent de la palette telle
 * quelle, sans dégradé cuit qui se battrait avec l'éclairage.
 */

/** Hauteur sous plafond, en cases. Une salle d'exposition est haute. */
export const ROOM_H = 3.6;

/** Hauteur des yeux, en vue subjective. */
export const EYE_H = 0.62;

/** Socle : trois gradins décroissants, comme une stèle de musée. */
export function buildPedestal(): BufferGeometry {
  const parts: BufferGeometry[] = [
    box([0.95, 0.12, 0.95], [0, 0.06, 0], P.stoneLight),
    box([0.78, 0.72, 0.78], [0, 0.48, 0], P.stoneHi),
    box([0.88, 0.1, 0.88], [0, 0.89, 0], P.white),
  ];
  return merge(parts);
}

/** Colonne cannelée, du sol au plafond. */
export function buildColumn(): BufferGeometry {
  return merge([
    box([0.66, 0.14, 0.66], [0, 0.07, 0], P.stoneLight),
    box([0.5, ROOM_H - 0.4, 0.5], [0, ROOM_H / 2 - 0.1, 0], P.white),
    box([0.7, 0.16, 0.7], [0, ROOM_H - 0.22, 0], P.stoneLight),
  ]);
}

/** Stèle d'accueil : un panneau incliné sur un pied. */
export function buildLectern(): BufferGeometry {
  return merge([
    box([0.5, 0.1, 0.5], [0, 0.05, 0], P.stoneLight),
    box([0.16, 0.8, 0.16], [0, 0.45, 0], P.roofCopperDark),
    box([0.72, 0.44, 0.1], [0, 0.95, 0.08], P.roofCopper),
  ]);
}

/* --- utilitaires ---------------------------------------------------------- */

function box(
  size: [number, number, number],
  at: [number, number, number],
  color: string,
): BufferGeometry {
  const g = new BoxGeometry(...size);
  const c = new Color(color);
  const attr = new Float32Array(g.attributes.position.count * 3);
  for (let i = 0; i < attr.length; i += 3) {
    attr[i] = c.r;
    attr[i + 1] = c.g;
    attr[i + 2] = c.b;
  }
  g.setAttribute('color', new BufferAttribute(attr, 3));
  g.translate(...at);
  return g;
}

/** Fusion naïve de boîtes : un prop = une géométrie = un seul draw call. */
function merge(parts: BufferGeometry[]): BufferGeometry {
  const total = parts.reduce((n, p) => n + p.attributes.position.count, 0);
  const position = new Float32Array(total * 3);
  const normal = new Float32Array(total * 3);
  const color = new Float32Array(total * 3);
  const index: number[] = [];
  let offset = 0;

  for (const part of parts) {
    position.set(part.attributes.position.array as Float32Array, offset * 3);
    normal.set(part.attributes.normal.array as Float32Array, offset * 3);
    color.set(part.attributes.color.array as Float32Array, offset * 3);
    const idx = part.getIndex();
    if (idx) for (let i = 0; i < idx.count; i++) index.push(idx.getX(i) + offset);
    offset += part.attributes.position.count;
    part.dispose();
  }

  const out = new PlaneGeometry(); // conteneur vide, ses attributs sont remplacés
  out.setAttribute('position', new BufferAttribute(position, 3));
  out.setAttribute('normal', new BufferAttribute(normal, 3));
  out.setAttribute('color', new BufferAttribute(color, 3));
  out.setIndex(index);
  out.deleteAttribute('uv');
  out.computeBoundingSphere();
  return out;
}

/**
 * Plaque gravée : le texte est rendu dans une texture à la police du jeu.
 *
 * Aucune police 3D n'est chargée : la même fonte 3x5 qui écrit les enseignes du
 * bourg écrit les cartels du hall. C'est ce qui fait que la salle, malgré la
 * perspective et l'éclairage, appartient encore au même monde.
 */
export const PLAQUE_W = 96;
export const PLAQUE_H = 32;

/**
 * Plaque ajustée à son texte.
 *
 * Le bandeau mural fait 160 px de large quel que soit le mot : « SORTIE » y
 * tenait sur un cinquième de la plaque et devenait illisible à trois pas. Une
 * étiquette se taille donc au texte, et c'est le maillage qui règle la taille
 * apparente.
 */
export function labelRaster(text: string): Raster {
  const safe = fontSafe(text);
  const w = textWidth(safe) + 10;
  const h = GLYPH_H + 10;
  const out = createRaster(w, h);
  fillRect(out, 0, 0, w, h, P.roofCopperDark);
  fillRect(out, 2, 2, w - 4, h - 4, P.roofCopper);
  fillRect(out, 2, 2, w - 4, 1, P.roofCopperLight);
  blit(out, textRaster(safe, P.ink), 5, 5);
  return out;
}

/** Bandeau mural : le nom de la salle, gravé large. */
export const BANNER_W = 160;
export const BANNER_H = 40;

export function bannerRaster(text: string): Raster {
  const out = createRaster(BANNER_W, BANNER_H);
  fillRect(out, 0, 0, BANNER_W, BANNER_H, P.roofCopperDark);
  fillRect(out, 3, 3, BANNER_W - 6, BANNER_H - 6, P.roofCopper);
  fillRect(out, 3, 3, BANNER_W - 6, 2, P.roofCopperLight);
  fillRect(out, 3, BANNER_H - 5, BANNER_W - 6, 2, P.roofCopperDark);

  const safe = fontSafe(text);
  const glyphs = textRaster(safe, P.ink);
  blit(
    out,
    glyphs,
    Math.max(3, Math.floor((BANNER_W - textWidth(safe)) / 2)),
    Math.floor((BANNER_H - GLYPH_H) / 2),
  );
  return out;
}

export function plaqueRaster(title: string, subtitle: string): Raster {
  const out = createRaster(PLAQUE_W, PLAQUE_H);
  fillRect(out, 0, 0, PLAQUE_W, PLAQUE_H, P.roofCopperDark);
  fillRect(out, 2, 2, PLAQUE_W - 4, PLAQUE_H - 4, P.roofCopper);
  fillRect(out, 2, 2, PLAQUE_W - 4, 1, P.roofCopperLight);

  const line = (text: string, y: number, color: string) => {
    /* Le texte vient des données de parcours, pas d'une constante écrite pour
       la police : accents et tirets cadratins y sont normaux. On translittère,
       puis on coupe — un cartel qui déborde du cadre est illisible. */
    const max = Math.floor((PLAQUE_W - 8 + 1) / 4);
    const safe = fontSafe(text).slice(0, max);
    if (!safe) return;
    blit(out, textRaster(safe, color), Math.max(2, Math.floor((PLAQUE_W - textWidth(safe)) / 2)), y);
  };

  line(title, 6, P.ink);
  line(subtitle, 6 + GLYPH_H + 5, P.wallWarm);
  return out;
}

/**
 * Porte de sortie, encastrée dans un mur.
 *
 * Sans elle, le mur du fond est continu et rien ne dit par où l'on repart :
 * c'était le défaut signalé — on se retrouve enfermé dans une salle dont on
 * sait pourtant qu'on est entré quelque part. La position n'est pas écrite en
 * dur : on prend la case de mur qui touche la téléportation, donc la porte est
 * toujours là où la carte dit qu'on sort.
 *
 * Géométrie orientée vers +z (le sud de la carte) ; l'appelant fait tourner le
 * groupe selon le mur concerné.
 */
export const DOOR_W = 1.1;
export const DOOR_H = 2.3;

export function buildDoorway(): BufferGeometry {
  const jamb = 0.16;
  const half = DOOR_W / 2;
  return merge([
    // Montants et linteau : le chambranle, en pierre claire.
    box([jamb, DOOR_H, 1], [-half - jamb / 2, DOOR_H / 2, 0], P.white),
    box([jamb, DOOR_H, 1], [half + jamb / 2, DOOR_H / 2, 0], P.white),
    box([DOOR_W + jamb * 2, 0.22, 1], [0, DOOR_H + 0.11, 0], P.stoneLight),
    // Le reste du mur au-dessus du linteau.
    box([DOOR_W + jamb * 2, ROOM_H - DOOR_H - 0.22, 1], [0, (ROOM_H + DOOR_H + 0.22) / 2, 0], P.stoneHi),
    // Seuil, côté salle : un liseré de cuivre au sol sous l'embrasure.
    box([DOOR_W, 0.06, 0.5], [0, 0.03, -0.25], P.roofCopper),
  ]);
}
