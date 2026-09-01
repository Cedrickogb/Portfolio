import { PALETTE } from './palette';
import type { PixelArt } from './pixel';

/**
 * Styles de bâtiment.
 *
 * Un bourg où toutes les maisons sont identiques ne ressemble à rien : c'est le
 * premier signe qu'un décor est généré. Chaque bâtiment reçoit donc sa propre
 * combinaison de toiture, de crépi et de menuiserie, plus des variations de
 * gabarit (hauteur, débord de toit, rangée de fenêtres).
 *
 * Les motifs de toit et de façade sont *générés* à partir de ces couleurs
 * plutôt qu'écrits en dur : ajouter un style est une entrée dans la table
 * ci-dessous, pas deux nouvelles grilles de 16x16 à dessiner.
 */

export interface BuildingStyle {
  roof: { base: string; light: string; side: string };
  wall: { base: string; hi: string; dark: string };
  trim: string;
  trimDark: string;
  /** Hauteur du corps, en tuiles. */
  bodyHeight: number;
  /** Épaisseur du bandeau de toit. */
  roofHeight: number;
  /** Débord du toit : c'est lui qui donne la silhouette. */
  overhang: number;
  /** Rangée de fenêtres de part et d'autre de la porte. */
  windows: boolean;
}

const P = PALETTE;

export const BUILDING_STYLES = {
  /** Le labo : toit vert de la marque, crépi crème, gabarit trapu. */
  lab: {
    roof: { base: P.roof, light: P.roofLight, side: P.roofDark },
    wall: { base: P.wall, hi: P.wallHi, dark: P.wallDark },
    trim: P.trim,
    trimDark: P.trimDark,
    bodyHeight: 2,
    roofHeight: 0.42,
    overhang: 0.3,
    windows: true,
  },
  /** Le quartier des quêtes : toit de tuiles rouges, crépi chaud, plus haut. */
  quests: {
    roof: { base: P.roofRed, light: P.roofRedLight, side: P.roofRedDark },
    wall: { base: P.wallWarm, hi: P.wallWarmHi, dark: P.wallWarmDark },
    trim: P.trim,
    trimDark: P.trimDark,
    bodyHeight: 2.3,
    roofHeight: 0.5,
    overhang: 0.36,
    windows: true,
  },
  /** Le magasin : toit bleu, façade grise, large débord façon auvent. */
  stacks: {
    roof: { base: P.roofBlue, light: P.roofBlueLight, side: P.roofBlueDark },
    wall: { base: P.wallGrey, hi: P.wallGreyHi, dark: P.wallGreyDark },
    /* Pas `ink` en menuiserie : la porte devenait un rectangle noir découpé
       dans la façade. Les menuiseries doivent rester des matériaux, pas des
       trous. */
    trim: P.stoneLight,
    trimDark: P.stoneDark,
    bodyHeight: 2.05,
    roofHeight: 0.36,
    overhang: 0.38,
    windows: true,
  },
  /** Le centre de contact : toit turquoise, crépi clair, toit épais. */
  contact: {
    roof: { base: P.roofTeal, light: P.roofTealLight, side: P.roofTealDark },
    wall: { base: P.wallHi, hi: P.white, dark: P.wallDark },
    trim: P.roofTealDark,
    trimDark: P.stoneDark,
    bodyHeight: 2.1,
    roofHeight: 0.58,
    overhang: 0.32,
    windows: false,
  },
} as const satisfies Record<string, BuildingStyle>;

export type BuildingStyleName = keyof typeof BUILDING_STYLES;

export const DEFAULT_STYLE: BuildingStyleName = 'lab';

export const isBuildingStyle = (name: string): name is BuildingStyleName =>
  Object.prototype.hasOwnProperty.call(BUILDING_STYLES, name);

/** Toiture : losanges clairs sur fond coloré, le motif signature du bourg. */
export function roofArt(style: BuildingStyle): PixelArt {
  const pixels: string[] = [];
  for (let y = 0; y < 16; y++) {
    let row = '';
    for (let x = 0; x < 16; x++) {
      if ((x + y) % 8 === 0 || (((x - y) % 8) + 8) % 8 === 0) row += 'L';
      else if ((x + y) % 8 === 1 || (((x - y) % 8) + 8) % 8 === 1) row += 'l';
      else row += 'R';
    }
    pixels.push(row);
  }
  return { palette: { R: style.roof.base, l: style.roof.light, L: PALETTE.roofLine }, pixels };
}

/** Crépi : grain horizontal discret, avec un joint tous les huit texels. */
export function wallArt(style: BuildingStyle): PixelArt {
  const pixels: string[] = [];
  for (let y = 0; y < 16; y++) {
    let row = '';
    for (let x = 0; x < 16; x++) {
      if (y % 8 === 7) row += 'd';
      else if ((x * 3 + y) % 19 === 0) row += 'C';
      else row += 'c';
    }
    pixels.push(row);
  }
  return { palette: { c: style.wall.base, C: style.wall.hi, d: style.wall.dark }, pixels };
}
