import { PALETTE } from './palette';
import { blit, createRaster, ellipseRaster, fillRect, mirrorX, outline, type Raster } from './raster';

import type { Direction } from '@/game/engine/direction';

/**
 * Sprite du héros, dessiné par code plutôt qu'écrit case par case.
 *
 * Écrire 16 frames à la main représenterait des centaines de lignes de grille
 * pour un résultat difficile à retoucher. Ici la silhouette est paramétrée :
 * trois vues (face, dos, profil), un décalage de jambes, et le profil gauche
 * obtenu par miroir du droit. Changer une couleur se fait en une ligne.
 *
 * Format 16x16, soit **exactement une tuile** : l'échelle des overworlds de
 * console portable. Un sprite plus grand écrase le décor et fait paraître la
 * carte minuscule.
 *
 * Les proportions sont volontairement trapues — tête 50 %, torse 29 %,
 * jambes 21 %. C'est ce déséquilibre assumé qui rend un personnage
 * lisible et attachant à si peu de pixels ; une silhouette réaliste, à cette
 * taille, n'est qu'un bâtonnet.
 */

export const HERO = {
  frameW: 16,
  frameH: 16,
  /** 4 frames de marche : repos, pas gauche, repos, pas droit. */
  cols: 4,
  /** 4 orientations, une par ligne de l'atlas. */
  rows: 4,
} as const;

export const HERO_ATLAS_W = HERO.frameW * HERO.cols;
export const HERO_ATLAS_H = HERO.frameH * HERO.rows;

/** Ligne de l'atlas pour chaque orientation. */
export const HERO_ROW: Record<Direction, number> = { down: 0, left: 1, right: 2, up: 3 };

/** Montures possibles. Chacune produit son propre atlas. */
export type Mount = 'none' | 'bike' | 'boat';

/** Décalage de jambes par colonne : le cycle de marche. */
const LEG_PHASE = [0, 1, 0, -1] as const;

type View = 'down' | 'up' | 'side';

/**
 * Jeu de couleurs d'un personnage.
 *
 * Le héros est dessiné par une fonction : il suffit donc de lui passer d'autres
 * teintes pour obtenir un autre personnage. Les PNJ ne coûtent ni sprite ni
 * atlas supplémentaires à dessiner — seulement six couleurs.
 */
export interface HeroLook {
  skinHi: string;
  skin: string;
  skinShade: string;
  hair: string;
  hairHi: string;
  shirt: string;
  shirtShade: string;
  pants: string;
  pantsShade: string;
  shoe: string;
}

const P0 = PALETTE;

export const LOOKS: Record<string, HeroLook> = {
  player: {
    skinHi: P0.skinHi, skin: P0.skin, skinShade: P0.skinShade,
    hair: P0.hair, hairHi: P0.hairHi,
    shirt: P0.shirt, shirtShade: P0.shirtShade,
    pants: P0.pants, pantsShade: P0.pantsShade, shoe: P0.shoe,
  },
  /** Registre des quêtes : chemise verte de la marque. */
  clerk: {
    skinHi: P0.wallWarmHi, skin: P0.wallWarm, skinShade: P0.wallWarmDark,
    hair: P0.trimDark, hairHi: P0.trim,
    shirt: P0.primary, shirtShade: P0.primaryDark,
    pants: P0.stone, pantsShade: P0.stoneDark, shoe: P0.ink,
  },
  /** Inventaire des stacks : bleu de la toiture. */
  keeper: {
    skinHi: P0.skinHi, skin: P0.skin, skinShade: P0.skinShade,
    hair: P0.ink, hairHi: P0.hair,
    shirt: P0.roofBlue, shirtShade: P0.roofBlueDark,
    pants: P0.stoneDark, pantsShade: P0.ink, shoe: P0.ink,
  },
  /** Laboratoire : blouse claire. */
  self: {
    skinHi: P0.skinHi, skin: P0.skin, skinShade: P0.skinShade,
    hair: P0.hair, hairHi: P0.hairHi,
    shirt: P0.wallHi, shirtShade: P0.wallDark,
    pants: P0.pantsShade, pantsShade: P0.ink, shoe: P0.ink,
  },
  /** Centre de contact : turquoise du toit. */
  nurse: {
    skinHi: P0.wallWarmHi, skin: P0.wallWarm, skinShade: P0.wallWarmDark,
    hair: P0.trimDark, hairHi: P0.trim,
    shirt: P0.roofTeal, shirtShade: P0.roofTealDark,
    pants: P0.white, pantsShade: P0.wallDark, shoe: P0.stoneDark,
  },
};

export const lookOf = (name?: string): HeroLook => LOOKS[name ?? 'player'] ?? LOOKS.player;

/* Repères verticaux. 1 px de marge en haut et en bas est réservé au contour,
   qui élargit la silhouette d'un pixel sur chaque bord.

   Silhouette y1..14 : tête 7 rangées (50 %), torse 4 (29 %), jambes 3 (21 %).
   Les yeux tiennent sur une seule rangée — c'est ce qui laisse assez de peau
   au-dessus et en dessous pour qu'un visage se lise à cette taille. */
const HAIR_TOP = 1;
const FACE_TOP = 4;
const EYE_Y = 5;
const BODY_TOP = 8;
const LEG_TOP = 12;

/* La tête déborde des épaules de chaque côté : c'est la marque de la silhouette
   trapue, et ça sépare visuellement le crâne du torse sans trait de séparation. */
const HEAD_X = 3;
const HEAD_W = 10;
const BODY_X = 4;
const BODY_W = 8;

/**
 * Vélo, dessiné **par-dessus** le personnage.
 *
 * Premier essai : un vélo glissé sous le héros, dans les trois rangées que
 * laissaient les jambes. Résultat illisible — deux taches sombres aux pieds.
 * Une bicyclette ne se lit qu'à ses roues ; il leur faut de la place, donc
 * elles recouvrent les jambes et le cycliste est assis, pas debout.
 */
function drawBike(r: Raster, ox: number, oy: number, view: View, phase: number, P: HeroLook): void {
  const B = PALETTE;
  const y = (v: number) => oy + v;
  /* Le moyeu alterne clair/sombre au rythme du cycle : c'est ce scintillement
     qui fait percevoir la rotation, faute de pouvoir dessiner des rayons. */
  const hub = phase === 0 ? B.stoneLight : B.stoneHi;

  /** Roue de profil : un anneau de 5x4, creux, avec un moyeu d'un pixel. */
  /* Pneus en gris sombre, pas en noir : le contour de la silhouette est déjà
     noir, et une roue noire s'y fondait — le vélo n'était plus qu'une masse. */
  const wheel = (cx: number) => {
    fillRect(r, ox + cx - 2, y(12), 1, 2, B.stoneDark);
    fillRect(r, ox + cx + 2, y(12), 1, 2, B.stoneDark);
    fillRect(r, ox + cx - 1, y(11), 3, 1, B.stoneDark);
    fillRect(r, ox + cx - 1, y(14), 3, 1, B.stoneDark);
    fillRect(r, ox + cx, y(12), 1, 1, hub);
  };

  if (view === 'side') {
    wheel(3);
    wheel(12);
    fillRect(r, ox + 4, y(12), 8, 1, B.roofRed);      // cadre
    fillRect(r, ox + 4, y(11), 3, 1, B.ink);          // selle
    fillRect(r, ox + 11, y(9), 1, 3, B.stoneDark);    // potence
    fillRect(r, ox + 10, y(9), 4, 1, B.ink);          // guidon
    // Jambe avant repliée sur la pédale, qui suit la phase.
    fillRect(r, ox + 7, y(10), 2, 2, P.pants);
    fillRect(r, ox + 8, y(12 + (phase === 1 ? 0 : 1)), 2, 1, P.shoe);
    return;
  }

  /* De face ou de dos, un vélo se résume au guidon et à la roue avant : le
     reste est masqué par le cycliste. Dessiner les deux roues donnerait une
     silhouette de tracteur. */
  fillRect(r, ox + 7, y(11), 2, 4, B.stoneDark);      // roue vue en bout
  fillRect(r, ox + 7, y(12), 2, 1, hub);
  /* Garde-boue rouge : de face, le vélo se réduit à une barre noire sans lui.
     C'est la seule tache de couleur qui rattache cette vue au profil. */
  fillRect(r, ox + 6, y(11), 4, 1, B.roofRed);
  fillRect(r, ox + 3, y(10), 10, 1, B.ink);           // guidon
  fillRect(r, ox + 2, y(10), 1, 1, B.stoneDark);
  fillRect(r, ox + 13, y(10), 1, 1, B.stoneDark);
  fillRect(r, ox + 5, y(11), 2, 2, P.pants);          // genoux de part et d'autre
  fillRect(r, ox + 9, y(11), 2, 2, P.pantsShade);
  fillRect(r, ox + 5, y(13), 2, 1, P.shoe);
  fillRect(r, ox + 9, y(13), 2, 1, P.shoe);
}

/**
 * Barque, dessinée **par-dessus** le personnage.
 *
 * L'ordre compte : la coque doit masquer les jambes, sinon le rameur a l'air
 * de marcher sur l'eau — ce que montrait exactement la première traversée.
 * La rame bat au rythme du cycle de marche, seule chose qui distingue une
 * barque qui avance d'une barque à l'arrêt.
 */
function drawBoat(r: Raster, ox: number, oy: number, view: View, phase: number): void {
  const B = PALETTE;
  const y = (v: number) => oy + v;

  if (view === 'side') {
    fillRect(r, ox + 1, y(11), 14, 1, B.woodLight);   // plat-bord
    fillRect(r, ox + 1, y(12), 14, 2, B.wood);
    fillRect(r, ox + 3, y(14), 10, 1, B.woodDark);    // carène
    fillRect(r, ox + 0, y(10), 1, 2, B.woodLight);    // poupe relevée
    fillRect(r, ox + 15, y(10), 1, 2, B.woodLight);   // proue relevée
    fillRect(r, ox + 2, y(12), 12, 1, B.woodDark);    // banc
    // Rame : la pale monte et descend au rythme du cycle.
    const oar = y(11 + (phase === 1 ? 0 : phase === -1 ? 3 : 2));
    fillRect(r, ox + 12, oar, 4, 1, B.woodDark);
    return;
  }

  fillRect(r, ox + 2, y(11), 12, 1, B.woodLight);
  fillRect(r, ox + 2, y(12), 12, 2, B.wood);
  fillRect(r, ox + 3, y(14), 10, 1, B.woodDark);
  fillRect(r, ox + 3, y(12), 10, 1, B.woodDark);      // banc
  // Une rame de chaque bord, en opposition de phase.
  fillRect(r, ox + 0, y(12 + (phase === 1 ? 0 : 1)), 3, 1, B.woodDark);
  fillRect(r, ox + 13, y(12 + (phase === -1 ? 0 : 1)), 3, 1, B.woodDark);
}

function drawHero(r: Raster, ox: number, oy: number, view: View, phase: number, P: HeroLook): void {
  const y = (v: number) => oy + v;

  /* Jambes : deux fuseaux de 2 px séparés par un vide de 2 px.
     Collés l'un à l'autre, ils formaient au repos un unique bloc de 6 px de
     large qui se lisait comme une jupe. Le vide central laisse le contour
     cerner chaque jambe séparément — c'est lui qui fait qu'on voit deux
     jambes, bien plus que la différence de teinte entre les deux. */
  const leftH = phase === 1 ? 1 : 2;
  const rightH = phase === -1 ? 1 : 2;
  const leftX = BODY_X + 1;
  const rightX = BODY_X + BODY_W - 3;
  fillRect(r, ox + leftX, y(LEG_TOP), 2, leftH, phase === -1 ? P.pantsShade : P.pants);
  fillRect(r, ox + leftX, y(LEG_TOP) + leftH, 2, 1, P.shoe);
  fillRect(r, ox + rightX, y(LEG_TOP), 2, rightH, phase === 1 ? P.pantsShade : P.pants);
  fillRect(r, ox + rightX, y(LEG_TOP) + rightH, 2, 1, P.shoe);

  // Torse : une seule rangée d'ombre, pour ne pas noircir tout le bas du corps.
  fillRect(r, ox + BODY_X, y(BODY_TOP), BODY_W, 4, P.shirt);
  fillRect(r, ox + BODY_X, y(BODY_TOP) + 3, BODY_W, 1, P.shirtShade);

  // Bras : de profil, seul le bras avant est visible.
  if (view !== 'side') {
    fillRect(r, ox + HEAD_X, y(BODY_TOP) + 1, 1, 2, P.shirtShade);
    fillRect(r, ox + HEAD_X, y(BODY_TOP) + 3, 1, 1, P.skin);
  }
  fillRect(r, ox + HEAD_X + HEAD_W - 1, y(BODY_TOP) + 1, 1, 2, P.shirtShade);
  fillRect(r, ox + HEAD_X + HEAD_W - 1, y(BODY_TOP) + 3, 1, 1, P.skin);

  // Visage
  fillRect(r, ox + HEAD_X, y(FACE_TOP), HEAD_W, 4, P.skin);
  fillRect(r, ox + HEAD_X + 1, y(FACE_TOP), HEAD_W - 2, 1, P.skinHi); // front éclairé
  fillRect(r, ox + HEAD_X + 1, y(FACE_TOP) + 3, HEAD_W - 2, 1, P.skinShade); // menton

  /* Coiffure : coupe courte, coins du crâne rognés pour arrondir la silhouette. */
  fillRect(r, ox + HEAD_X, y(HAIR_TOP) + 1, HEAD_W, 2, P.hair);
  fillRect(r, ox + HEAD_X + 1, y(HAIR_TOP), HEAD_W - 2, 1, P.hair);
  fillRect(r, ox + HEAD_X + 3, y(HAIR_TOP), HEAD_W - 6, 1, P.hairHi);

  if (view === 'up') {
    // De dos : la nuque est couverte, aucun visage.
    fillRect(r, ox + HEAD_X, y(FACE_TOP), HEAD_W, 3, P.hair);
    fillRect(r, ox + HEAD_X + 1, y(FACE_TOP), HEAD_W - 2, 1, P.hairHi);
  } else {
    // Mèches devant les oreilles.
    fillRect(r, ox + HEAD_X, y(FACE_TOP), 1, 2, P.hair);
    fillRect(r, ox + HEAD_X + HEAD_W - 1, y(FACE_TOP), 1, 2, P.hair);
  }

  // Yeux : une rangée, un pixel chacun.
  if (view === 'down') {
    fillRect(r, ox + HEAD_X + 2, y(EYE_Y), 1, 1, PALETTE.ink);
    fillRect(r, ox + HEAD_X + HEAD_W - 3, y(EYE_Y), 1, 1, PALETTE.ink);
  } else if (view === 'side') {
    fillRect(r, ox + HEAD_X + HEAD_W - 4, y(EYE_Y), 1, 1, PALETTE.ink);
    fillRect(r, ox + HEAD_X + HEAD_W, y(EYE_Y), 1, 1, P.skinShade); // nez
  }
}

/** Une frame isolée, contour compris. */
function heroFrame(view: View, phase: number, look: HeroLook, mount: Mount): Raster {
  const frame = createRaster(HERO.frameW, HERO.frameH);
  drawHero(frame, 0, 0, view, phase, look);
  /* Les montures se dessinent après le héros : elles doivent lui masquer les
     jambes, pas se glisser derrière. */
  if (mount === 'bike') drawBike(frame, 0, 0, view, phase, look);
  if (mount === 'boat') drawBoat(frame, 0, 0, view, phase);
  return outline(frame, PALETTE.ink);
}

/** Atlas complet : 4 orientations x 4 frames de marche. */
export function heroAtlas(look: HeroLook = LOOKS.player, mount: Mount = 'none'): Raster {
  const atlas = createRaster(HERO_ATLAS_W, HERO_ATLAS_H);

  for (let col = 0; col < HERO.cols; col++) {
    const phase = LEG_PHASE[col];
    const x = col * HERO.frameW;

    blit(atlas, heroFrame('down', phase, look, mount), x, HERO_ROW.down * HERO.frameH);
    blit(atlas, heroFrame('up', phase, look, mount), x, HERO_ROW.up * HERO.frameH);

    const side = heroFrame('side', phase, look, mount);
    blit(atlas, side, x, HERO_ROW.right * HERO.frameH);
    // Gauche = miroir de droite : une seule vue de profil à maintenir.
    blit(atlas, mirrorX(side), x, HERO_ROW.left * HERO.frameH);
  }

  return atlas;
}

/** Ombre portée au sol : ellipse calée sur la largeur réelle de la silhouette. */
export const HERO_SHADOW_W = 12;
export const HERO_SHADOW_H = 6;

/* Masque blanc : la teinte vient du matériau, pas de la texture. Une seule
   mécanique d'ombre pour tout le jeu, une seule couleur à ajuster. */
export const heroShadowRaster = (): Raster =>
  ellipseRaster(HERO_SHADOW_W, HERO_SHADOW_H, '#ffffff');

/** Hauteur du personnage en tuiles, pour calculer la longueur de son ombre. */
export const HERO_HEIGHT = HERO.frameH / 16;
