import { PALETTE } from './palette';
import type { PixelArt } from './pixel';

/**
 * Styles d'intérieur.
 *
 * Quatre salles au même gabarit doivent rester reconnaissables au premier coup
 * d'œil : c'est le sol et le mur qui font ce travail, pas le mobilier. Chaque
 * pôle a donc son revêtement — parquet chaud pour le registre, damier de
 * boutique pour l'inventaire, carrelage froid pour le labo, sol clair pour le
 * centre de contact.
 *
 * Comme pour les toitures, les motifs sont *générés* à partir de quelques
 * couleurs : ajouter un pôle est une entrée dans la table, pas deux grilles de
 * 16x16 à composer.
 */

export type FloorPattern = 'planks' | 'tiles' | 'checker';

export interface InteriorStyle {
  floor: { base: string; alt: string; seam: string; pattern: FloorPattern };
  wall: { panel: string; panelDark: string; upper: string; rail: string };
  /** Couleur d'accent, reprise sur le mobilier. */
  accent: string;
}

const P = PALETTE;

export const INTERIOR_STYLES = {
  quests: {
    floor: { base: P.wood, alt: P.woodLight, seam: P.woodDark, pattern: 'planks' },
    wall: { panel: P.trim, panelDark: P.trimDark, upper: P.wallWarm, rail: P.wallWarmHi },
    accent: P.roofRed,
  },
  stacks: {
    floor: { base: P.stoneLight, alt: P.wallGrey, seam: P.stone, pattern: 'checker' },
    wall: { panel: P.stoneDark, panelDark: P.ink, upper: P.wallGreyHi, rail: P.roofBlueLight },
    accent: P.roofBlue,
  },
  lab: {
    floor: { base: P.wallGreyHi, alt: P.stoneHi, seam: P.stoneLight, pattern: 'tiles' },
    wall: { panel: P.stone, panelDark: P.stoneDark, upper: P.white, rail: P.primaryLight },
    accent: P.primary,
  },
  contact: {
    floor: { base: P.white, alt: P.wallHi, seam: P.wallDark, pattern: 'tiles' },
    wall: { panel: P.roofTealDark, panelDark: P.stoneDark, upper: P.wallHi, rail: P.roofTealLight },
    accent: P.roofTeal,
  },
  /** Le hall : dallage clair façon marbre, murs de pierre, accent cuivré. */
  hall: {
    floor: { base: P.stoneHi, alt: P.white, seam: P.stoneLight, pattern: 'tiles' },
    wall: { panel: P.stoneLight, panelDark: P.stone, upper: P.white, rail: P.roofCopperLight },
    accent: P.roofCopper,
  },
} as const satisfies Record<string, InteriorStyle>;

export type InteriorStyleName = keyof typeof INTERIOR_STYLES;

export const isInteriorStyle = (name: string): name is InteriorStyleName =>
  Object.prototype.hasOwnProperty.call(INTERIOR_STYLES, name);

export function interiorFloorArt(style: InteriorStyle): PixelArt {
  const pixels: string[] = [];
  for (let y = 0; y < 16; y++) {
    let row = '';
    for (let x = 0; x < 16; x++) {
      if (style.floor.pattern === 'planks') {
        if (x % 8 === 0) row += 's';
        else if (y % 5 === (x < 8 ? 0 : 3)) row += 'a';
        else row += 'b';
      } else if (style.floor.pattern === 'checker') {
        const dark = (Math.floor(x / 8) + Math.floor(y / 8)) % 2 === 0;
        row += x % 8 === 7 || y % 8 === 7 ? 's' : dark ? 'b' : 'a';
      } else {
        row += x % 8 === 7 || y % 8 === 7 ? 's' : (x + y) % 11 === 0 ? 'a' : 'b';
      }
    }
    pixels.push(row);
  }
  return { palette: { b: style.floor.base, a: style.floor.alt, s: style.floor.seam }, pixels };
}

/**
 * Mur : lambris bas, cimaise, mur clair au-dessus.
 *
 * Le mur est vu par sa tranche haute — la caméra plonge — donc la cimaise doit
 * tomber dans le tiers inférieur de la texture pour rester visible.
 */
export function interiorWallArt(style: InteriorStyle): PixelArt {
  const pixels: string[] = [];
  for (let y = 0; y < 16; y++) {
    let row = '';
    for (let x = 0; x < 16; x++) {
      if (y < 9) row += (x * 3 + y) % 17 === 0 ? 'U' : 'u';
      else if (y === 9) row += 'r';
      else row += x % 6 === 0 ? 'D' : 'p';
    }
    pixels.push(row);
  }
  return {
    palette: {
      u: style.wall.upper,
      U: style.wall.rail,
      r: style.wall.rail,
      p: style.wall.panel,
      D: style.wall.panelDark,
    },
    pixels,
  };
}

/** Paillasson : une case au sol qui annonce une porte, dedans comme dehors. */
export function doormatArt(accent: string): PixelArt {
  const pixels: string[] = [];
  for (let y = 0; y < 16; y++) {
    let row = '';
    for (let x = 0; x < 16; x++) {
      const edge = x < 2 || y < 2 || x > 13 || y > 13;
      const inner = x > 4 && x < 11 && y > 4 && y < 11;
      row += edge ? 'e' : inner ? 'i' : 'm';
    }
    pixels.push(row);
  }
  return { palette: { e: PALETTE.woodDark, m: PALETTE.wood, i: accent }, pixels };
}
