import { PALETTE } from './palette';
import { blit, createRaster, fillRect, type Raster } from './raster';
import { GLYPH_H, textRaster, textWidth } from './font';

/**
 * Enseigne de façade : fond, liseré et texte centré, en une seule texture.
 *
 * Taille fixe de 32x8 texels, soit exactement 2 tuiles sur une demi-tuile.
 * Le format fixe évite d'avoir à redimensionner la géométrie du bâtiment selon
 * la longueur du mot, et garantit que toutes les enseignes du bourg s'alignent.
 */
export const SIGN_W = 32;
export const SIGN_H = 8;

/** Nombre maximal de caractères tenant sur une enseigne. */
export const SIGN_MAX_CHARS = Math.floor((SIGN_W - 4 + 1) / 4);

export function signRaster(label: string): Raster {
  const text = label.toUpperCase();
  if (textWidth(text) > SIGN_W - 4) {
    throw new Error(
      `Enseigne « ${label} » trop longue : ${text.length} caractères pour ${SIGN_MAX_CHARS} maximum`,
    );
  }

  const out = createRaster(SIGN_W, SIGN_H);
  fillRect(out, 0, 0, SIGN_W, SIGN_H, PALETTE.primaryDark);
  fillRect(out, 1, 1, SIGN_W - 2, SIGN_H - 2, PALETTE.primary);

  const glyphs = textRaster(text, PALETTE.ink);
  blit(
    out,
    glyphs,
    Math.floor((SIGN_W - glyphs.width) / 2),
    Math.floor((SIGN_H - GLYPH_H) / 2),
  );
  return out;
}

/* --- Panneaux plantés sur la carte -------------------------------------- */

export const POST_SIGN_W = 14;
export const POST_SIGN_H = 10;

/**
 * Face d'un panneau de bord de route.
 *
 * La version précédente avait une face en vert primaire : du vert vif posé sur
 * de l'herbe verte, donc invisible. Un panneau doit trancher avec le sol qu'il
 * borde — d'où une planche claire cerclée de bois sombre, avec trois lignes
 * suggérant du texte. C'est la convention des tilesets d'origine, et ça se
 * repère du premier coup d'œil.
 */
export function postSignRaster(): Raster {
  const out = createRaster(POST_SIGN_W, POST_SIGN_H);
  fillRect(out, 0, 0, POST_SIGN_W, POST_SIGN_H, PALETTE.woodDark);
  fillRect(out, 1, 1, POST_SIGN_W - 2, POST_SIGN_H - 2, PALETTE.wallHi);

  // Trois traits d'écriture, le dernier plus court comme une fin de phrase.
  fillRect(out, 3, 3, POST_SIGN_W - 6, 1, PALETTE.woodDark);
  fillRect(out, 3, 5, POST_SIGN_W - 6, 1, PALETTE.woodDark);
  fillRect(out, 3, 7, POST_SIGN_W - 9, 1, PALETTE.woodDark);
  return out;
}
