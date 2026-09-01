import { createRaster, parseColor, setPixel, type Raster } from './raster';

/**
 * Police bitmap 3x5, en capitales.
 *
 * Trois pixels de large, c'est le minimum où une lettre reste identifiable —
 * et c'est ce qui permet d'écrire un mot sur une enseigne de deux tuiles. Les
 * glyphes suivent le même principe que les tuiles : une grille de caractères,
 * lisible et modifiable à la main.
 */

export const GLYPH_W = 3;
export const GLYPH_H = 5;
/** Colonne vide entre deux lettres. */
export const GLYPH_GAP = 1;

const GLYPHS: Record<string, string[]> = {
  'A': ['.#.', '#.#', '###', '#.#', '#.#'],
  'B': ['##.', '#.#', '##.', '#.#', '##.'],
  'C': ['.##', '#..', '#..', '#..', '.##'],
  'D': ['##.', '#.#', '#.#', '#.#', '##.'],
  'E': ['###', '#..', '##.', '#..', '###'],
  'F': ['###', '#..', '##.', '#..', '#..'],
  'G': ['.##', '#..', '#.#', '#.#', '.##'],
  'H': ['#.#', '#.#', '###', '#.#', '#.#'],
  'I': ['###', '.#.', '.#.', '.#.', '###'],
  'J': ['..#', '..#', '..#', '#.#', '.#.'],
  'K': ['#.#', '#.#', '##.', '#.#', '#.#'],
  'L': ['#..', '#..', '#..', '#..', '###'],
  'M': ['#.#', '###', '###', '#.#', '#.#'],
  'N': ['#.#', '###', '###', '###', '#.#'],
  'O': ['.#.', '#.#', '#.#', '#.#', '.#.'],
  'P': ['##.', '#.#', '##.', '#..', '#..'],
  'Q': ['.#.', '#.#', '#.#', '##.', '.##'],
  'R': ['##.', '#.#', '##.', '#.#', '#.#'],
  'S': ['.##', '#..', '.#.', '..#', '##.'],
  'T': ['###', '.#.', '.#.', '.#.', '.#.'],
  'U': ['#.#', '#.#', '#.#', '#.#', '.##'],
  'V': ['#.#', '#.#', '#.#', '#.#', '.#.'],
  'W': ['#.#', '#.#', '###', '###', '#.#'],
  'X': ['#.#', '#.#', '.#.', '#.#', '#.#'],
  'Y': ['#.#', '#.#', '.#.', '.#.', '.#.'],
  'Z': ['###', '..#', '.#.', '#..', '###'],
  '0': ['###', '#.#', '#.#', '#.#', '###'],
  '1': ['.#.', '##.', '.#.', '.#.', '###'],
  '2': ['##.', '..#', '.#.', '#..', '###'],
  '3': ['##.', '..#', '.#.', '..#', '##.'],
  '4': ['#.#', '#.#', '###', '..#', '..#'],
  '5': ['###', '#..', '##.', '..#', '##.'],
  '6': ['.##', '#..', '###', '#.#', '###'],
  '7': ['###', '..#', '.#.', '.#.', '.#.'],
  '8': ['###', '#.#', '###', '#.#', '###'],
  '9': ['###', '#.#', '###', '..#', '##.'],
  ' ': ['...', '...', '...', '...', '...'],
  '.': ['...', '...', '...', '...', '.#.'],
  '-': ['...', '...', '###', '...', '...'],
  '+': ['...', '.#.', '###', '.#.', '...'],
  '!': ['.#.', '.#.', '.#.', '...', '.#.'],
  "'": ['.#.', '.#.', '...', '...', '...'],
};

/** Largeur d'un texte rendu, en pixels. */
export const textWidth = (text: string): number =>
  text.length === 0 ? 0 : text.length * (GLYPH_W + GLYPH_GAP) - GLYPH_GAP;

/**
 * Rend un texte en pixels. Les caractères inconnus lèvent une erreur plutôt
 * que de s'afficher en blanc : une enseigne muette passerait inaperçue.
 */
export function textRaster(text: string, color: string): Raster {
  const upper = text.toUpperCase();
  const out = createRaster(Math.max(1, textWidth(upper)), GLYPH_H);
  const rgba = parseColor(color);

  // Boucles indexées plutôt que spread : la cible TypeScript de l'app est es5.
  for (let i = 0; i < upper.length; i++) {
    const ch = upper[i];
    const glyph = GLYPHS[ch];
    if (!glyph) throw new Error(`Caractère '${ch}' absent de la police 3x5`);
    const ox = i * (GLYPH_W + GLYPH_GAP);
    for (let y = 0; y < GLYPH_H; y++) {
      for (let x = 0; x < GLYPH_W; x++) {
        if (glyph[y][x] === '#') setPixel(out, ox + x, y, rgba);
      }
    }
  }

  return out;
}
