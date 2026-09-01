import { BoxGeometry, BufferAttribute, Color, type BufferGeometry } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { PALETTE } from './palette';

/**
 * Props construits par assemblage de primitives, avec la couleur de chaque face
 * *cuite dans la géométrie* (attribut `color`).
 *
 * Pourquoi cuire les couleurs plutôt qu'éclairer la scène : un éclairage
 * calculé produit des teintes intermédiaires qui sortent de la palette et
 * cassent l'unité avec les sprites. En figeant une couleur par orientation de
 * face, chaque pixel affiché est *exactement* une couleur de PALETTE. Le
 * matériau associé est un `meshBasicMaterial` avec `vertexColors`.
 *
 * Contrainte de hauteur : avec une caméra inclinée, tout décor situé au sud du
 * joueur passe devant lui. Les props plantés le long des cases de circulation
 * restent donc bas — clôtures et panneaux sous 0,7 tuile.
 */

interface FaceColors {
  top: string;
  side: string;
  /** Face tournée vers la caméra ; par défaut identique aux côtés. */
  front?: string;
  bottom?: string;
}

/* BoxGeometry range ses 24 sommets par face, dans l'ordre
   +X, -X, +Y (dessus), -Y (dessous), +Z (avant), -Z. */
const FACE_ORDER = ['side', 'side', 'top', 'bottom', 'front', 'side'] as const;

export function coloredBox(
  size: [number, number, number],
  position: [number, number, number],
  colors: FaceColors,
): BufferGeometry {
  const geometry = new BoxGeometry(...size);
  const attribute = new Float32Array(24 * 3);
  const color = new Color();

  FACE_ORDER.forEach((slot, face) => {
    const hex =
      slot === 'top' ? colors.top
      : slot === 'bottom' ? colors.bottom ?? colors.side
      : slot === 'front' ? colors.front ?? colors.side
      : colors.side;
    color.set(hex);
    for (let v = 0; v < 4; v++) {
      const i = (face * 4 + v) * 3;
      attribute[i] = color.r;
      attribute[i + 1] = color.g;
      attribute[i + 2] = color.b;
    }
  });

  geometry.setAttribute('color', new BufferAttribute(attribute, 3));
  geometry.translate(...position);
  return geometry;
}

/** Fusionne les boîtes d'un prop : un prop = une géométrie = un seul draw call. */
export function assemble(parts: BufferGeometry[]): BufferGeometry {
  const merged = mergeGeometries(parts);
  if (!merged) throw new Error('Fusion de géométrie impossible : attributs incompatibles');
  parts.forEach((p) => p.dispose());
  return merged;
}

const P = PALETTE;

/**
 * Hauteur hors-tout de chaque prop, en tuiles. Exportée pour que la longueur
 * des ombres portées reste synchronisée avec la géométrie : changer la taille
 * d'un arbre sans corriger son ombre se voit immédiatement.
 */
export const PROP_HEIGHT = {
  counter: 0.78,
  pedestal: 1.15,
  shelf: 1.5,
  plant: 0.95,
  terminal: 1.05,
  tree: 2.12,
  lamp: 1.84,
  sign: 0.88,
  fence: 0.55,
  flower: 0.22,
} as const;

/**
 * Arbre : tronc élancé sous une canopée en trois gradins.
 *
 * La version précédente empilait deux grosses boîtes et lisait comme une haie
 * taillée. Ce n'était pas un problème d'occultation — le tronc restait visible
 * à 61 % — mais de silhouette : un cube ne ressemble pas à du feuillage. Trois
 * gradins de largeur décroissante donnent un contour en escalier qui se lit
 * comme un houppier, et chaque gradin reçoit une teinte différente pour que
 * les marches se détachent.
 */
export const buildTree = (): BufferGeometry =>
  assemble([
    coloredBox([0.3, 1.1, 0.3], [0, 0.55, 0], { top: P.woodLight, side: P.woodDark, front: P.wood }),
    coloredBox([1.2, 0.42, 1.2], [0, 1.24, 0], { top: P.tallGrass, side: P.tallGrassDark, front: P.tallGrass }),
    coloredBox([0.94, 0.4, 0.94], [0, 1.62, 0], { top: P.grassDark, side: P.tallGrass, front: P.grassDark }),
    coloredBox([0.58, 0.34, 0.58], [0, 1.95, 0], { top: P.grassHi, side: P.grassDark, front: P.grassLight }),
  ]);

/** Lampadaire : mât + tête lumineuse aux couleurs de la marque. */
export const buildLamp = (): BufferGeometry =>
  assemble([
    coloredBox([0.16, 1.5, 0.16], [0, 0.75, 0], { top: P.stoneLight, side: P.stoneDark, front: P.stone }),
    coloredBox([0.4, 0.34, 0.4], [0, 1.67, 0], { top: P.primaryLight, side: P.primaryDark, front: P.primary }),
  ]);

/**
 * Panneau de bord de route : deux piquets et une planche claire.
 *
 * La planche est en crépi clair, pas en vert : un panneau vert sur de l'herbe
 * verte est invisible, quelle que soit sa taille. La face avant reçoit en plus
 * une texture d'écriture (voir `postSignRaster`). Sommet à 0,88 tuile — assez
 * pour se voir, assez bas pour ne pas masquer le joueur quand il est au nord.
 */
export const SIGN_BOARD_W = 0.88;
export const SIGN_BOARD_H = 0.62;
export const SIGN_BOARD_Y = 0.55;

export const buildSign = (): BufferGeometry =>
  assemble([
    coloredBox([0.12, 0.34, 0.12], [-0.26, 0.17, 0], { top: P.woodLight, side: P.woodDark, front: P.wood }),
    coloredBox([0.12, 0.34, 0.12], [0.26, 0.17, 0], { top: P.woodLight, side: P.woodDark, front: P.wood }),
    coloredBox([SIGN_BOARD_W, SIGN_BOARD_H, 0.14], [0, SIGN_BOARD_Y, 0], {
      top: P.woodLight, side: P.woodDark, front: P.wallHi,
    }),
  ]);

/**
 * Clôture : deux piquets et une lisse horizontale, sommet à 0,55 tuile.
 * Assez basse pour délimiter l'espace sans jamais masquer le joueur.
 */
export const buildFence = (): BufferGeometry =>
  assemble([
    coloredBox([0.16, 0.55, 0.16], [-0.32, 0.27, 0], { top: P.woodLight, side: P.woodDark, front: P.wood }),
    coloredBox([0.16, 0.55, 0.16], [0.32, 0.27, 0], { top: P.woodLight, side: P.woodDark, front: P.wood }),
    coloredBox([1, 0.14, 0.1], [0, 0.4, 0], { top: P.woodLight, side: P.woodDark, front: P.wood }),
  ]);

/**
 * Touffe fleurie : trois petites boîtes à peine surélevées.
 *
 * Les massifs restent traversables — c'est un décor de sol — mais leur donner
 * un peu de volume les fait exister à la lumière rasante et leur permet de
 * porter une ombre, comme le reste du décor.
 */
export const buildFlowerTuft = (): BufferGeometry =>
  assemble([
    coloredBox([0.24, 0.2, 0.24], [-0.2, 0.1, 0.1], { top: P.flowerRed, side: P.grassDark, front: P.flowerPink }),
    coloredBox([0.2, 0.16, 0.2], [0.18, 0.08, -0.14], { top: P.flowerPink, side: P.tallGrassDark, front: P.flowerRed }),
    coloredBox([0.18, 0.14, 0.18], [0.04, 0.07, 0.22], { top: P.flowerHi, side: P.grassDark, front: P.flowerRed }),
  ]);

/**
 * Comptoir : plateau clair sur un bâti sombre.
 *
 * Bloquant, mais on parle par-dessus : `decide()` cherche l'interlocuteur sur
 * la case *au-delà* du comptoir, sinon il faudrait le contourner pour engager
 * la conversation — ce qu'aucun jeu ne demande.
 */
export const buildCounter = (): BufferGeometry =>
  assemble([
    coloredBox([1, 0.62, 0.86], [0, 0.31, 0], { top: P.wood, side: P.woodDark, front: P.wood }),
    coloredBox([1, 0.16, 1], [0, 0.7, 0], { top: P.wallHi, side: P.woodLight, front: P.wallHi }),
  ]);

/* --- Mobilier d'intérieur ------------------------------------------------
 *
 * Trois meubles suffisent à habiter une salle : un rayonnage contre le mur,
 * une plante dans un coin, un terminal sur un plan de travail. Chacun prend
 * une couleur d'accent en paramètre, pour se raccorder au pôle où il se trouve.
 */

/** Rayonnage : caisson à trois tablettes, avec des volumes colorés dessus. */
export const buildShelf = (accent: string): BufferGeometry =>
  assemble([
    coloredBox([0.94, 1.5, 0.5], [0, 0.75, -0.2], { top: P.woodLight, side: P.woodDark, front: P.wood }),
    coloredBox([0.8, 0.06, 0.44], [0, 0.5, -0.16], { top: P.wallHi, side: P.woodDark, front: P.wallHi }),
    coloredBox([0.8, 0.06, 0.44], [0, 1, -0.16], { top: P.wallHi, side: P.woodDark, front: P.wallHi }),
    coloredBox([0.18, 0.3, 0.18], [-0.22, 0.65, -0.1], { top: accent, side: P.woodDark, front: accent }),
    coloredBox([0.16, 0.26, 0.16], [0.1, 1.13, -0.1], { top: P.wallHi, side: P.stoneDark, front: P.stoneLight }),
  ]);

/** Plante en pot : deux étages de feuillage sur un pot de terre cuite. */
export const buildPlant = (): BufferGeometry =>
  assemble([
    coloredBox([0.44, 0.3, 0.44], [0, 0.15, 0], { top: P.trimDark, side: P.trimDark, front: P.trim }),
    coloredBox([0.6, 0.4, 0.6], [0, 0.5, 0], { top: P.grassHi, side: P.tallGrassDark, front: P.tallGrass }),
    coloredBox([0.38, 0.28, 0.38], [0, 0.81, 0], { top: P.grassHi, side: P.tallGrass, front: P.grassLight }),
  ]);

/** Terminal : plan de travail et écran allumé. */
export const buildTerminal = (accent: string): BufferGeometry =>
  assemble([
    coloredBox([0.94, 0.62, 0.6], [0, 0.31, 0], { top: P.stoneLight, side: P.stoneDark, front: P.stone }),
    coloredBox([0.5, 0.08, 0.34], [0, 0.66, 0.08], { top: P.ink, side: P.ink, front: P.ink }),
    coloredBox([0.62, 0.38, 0.1], [0, 0.86, -0.08], { top: P.stoneDark, side: P.ink, front: accent }),
  ]);

/**
 * Piédestal d'exposition : socle, fût, plateau, et une plaque inclinée.
 *
 * Il ne se lit pas par un texte gravé — à 16 px la gravure serait illisible —
 * mais par sa silhouette : tout le monde reconnaît un socle de musée.
 */
export const buildPedestal = (accent: string): BufferGeometry =>
  assemble([
    coloredBox([0.86, 0.16, 0.86], [0, 0.08, 0], { top: P.stoneLight, side: P.stoneDark, front: P.stone }),
    coloredBox([0.56, 0.72, 0.56], [0, 0.52, 0], { top: P.stoneHi, side: P.stoneDark, front: P.stoneLight }),
    coloredBox([0.8, 0.14, 0.8], [0, 0.95, 0], { top: P.stoneHi, side: P.stoneDark, front: P.stoneLight }),
    coloredBox([0.5, 0.12, 0.36], [0, 1.08, 0.06], { top: accent, side: P.woodDark, front: accent }),
  ]);
