/** Constantes de réglage. Une tuile = une unité monde. */

/** Durée d'un pas d'une case à l'autre, en ms. Plus bas = plus nerveux. */
export const STEP_MS = 145;

/**
 * Cadence par mode de déplacement.
 *
 * Le vélo ne change aucune règle de franchissement — seulement le rythme. C'est
 * suffisant : sur une carte de cette taille, passer de 145 à 80 ms par case
 * transforme la traversée d'une corvée en promenade. La barque est volontairement
 * plus lente que la marche, pour qu'une traversée se sente.
 */
export const STEP_MS_BY_TRAVEL: Record<'foot' | 'bike' | 'boat', number> = {
  foot: STEP_MS,
  bike: 80,
  boat: 170,
};

/** Résolution d'une tuile, en texels. Toutes les tuiles sont en 16x16. */
export const TILE_TEXELS = 16;

/**
 * Décalage de la caméra par rapport au joueur — atan(10/7) ≈ 55° d'inclinaison.
 *
 * En caméra orthographique, plus la vue est rasante, plus le champ s'étire en
 * profondeur. À 35° on voyait 20 tuiles de large pour 32 de profondeur : le
 * monde paraissait écrasé et on apercevait le vide au-delà de la carte. À 55°
 * le cadrage est presque carré, tout en laissant les décors montrer leurs
 * faces latérales — c'est ce basculement léger qui donne le volume.
 */
export const CAMERA_OFFSET: readonly [number, number, number] = [0, 10, 7];

/** Facteur de lissage du suivi caméra, par frame. 1 = collé, 0 = immobile. */
export const CAMERA_LERP = 0.14;

/* --- Cadrage et netteté --------------------------------------------------- */

/**
 * Cadrage visé, en tuiles de large.
 *
 * Un nombre de tuiles *fixe* paraissait la bonne idée — « sensation console »
 * plutôt que site responsive — mais à 11 tuiles sur un écran d'ordinateur,
 * chaque tuile occupe une centaine de pixels et le jeu ressemble à une loupe.
 * On vise donc un cadrage à peu près constant en tuiles, en laissant l'échelle
 * des texels s'adapter par paliers entiers à la largeur disponible.
 */
export const TARGET_TILES_X = 17;

const MIN_TEXEL_SCALE = 2;
const MAX_TEXEL_SCALE = 6;

/**
 * Pixels d'écran par texel de texture, pour une largeur de fenêtre donnée.
 *
 * **Toujours entier** : c'est la condition pour que le pixel art reste net. À
 * une échelle de 1,5, un texel sur deux s'étalerait sur 2 pixels et l'autre sur
 * 1, et les arêtes baveraient sans qu'on comprenne pourquoi.
 */
export function texelScaleFor(cssWidth: number): number {
  const raw = Math.round(cssWidth / (TARGET_TILES_X * TILE_TEXELS));
  return Math.min(MAX_TEXEL_SCALE, Math.max(MIN_TEXEL_SCALE, raw));
}

/** Pixels d'écran par tuile, pour une largeur de fenêtre donnée. */
export const pixelsPerTileFor = (cssWidth: number): number =>
  TILE_TEXELS * texelScaleFor(cssWidth);

/**
 * Rapport de pixels du tampon de rendu, arrondi à l'entier.
 *
 * Le tampon doit faire un multiple entier de la taille CSS : sinon le
 * navigateur réétire le canvas d'un facteur fractionnaire, et le nearest
 * neighbor produit des pixels de tailles inégales.
 */
export const bufferRatio = (): number =>
  typeof window === 'undefined'
    ? 1
    : Math.min(2, Math.max(1, Math.round(window.devicePixelRatio || 1)));

/* --- Ombres portées ------------------------------------------------------
 *
 * Aucune lumière n'existe dans la scène : les ombres ne sont donc pas calculées
 * mais *projetées*, sous forme de quads sombres posés au sol et décalés dans
 * la direction opposée au soleil. C'est exactement ce que font les tilesets
 * d'origine — le bord est franc, jamais dégradé — et ça coûte un draw call par
 * famille de décor au lieu d'une passe de shadow mapping.
 */

/** Azimut du soleil projeté au sol, normalisé. Soleil en haut à gauche. */
export const SUN_DIR: readonly [number, number] = [0.707, 0.707];

/** Longueur d'ombre par unité de hauteur. Plus haut = soleil plus rasant. */
export const SHADOW_LENGTH = 0.4;

/** Opacité des ombres. */
export const SHADOW_OPACITY = 0.3;

/** Hauteur du plan des ombres : au-dessus de tous les sols, sous les décors. */
export const SHADOW_Y = 0.02;

/** Décalage au sol de l'ombre d'un objet de hauteur `height`. */
export const shadowOffset = (height: number): [number, number] => [
  SUN_DIR[0] * height * SHADOW_LENGTH,
  SUN_DIR[1] * height * SHADOW_LENGTH,
];

/**
 * Hauteur masquée sous l'avancée d'un toit, vue depuis la caméra.
 *
 * Une enseigne posée trop haut sur la façade disparaît derrière le débord : le
 * toit la coupe en deux. La marge nécessaire n'est pas une valeur à régler à
 * l'œil, elle se déduit du débord et de l'inclinaison de la caméra.
 *
 * Le rayon qui va d'un point de façade vers la caméra s'élève de
 * `CAMERA_OFFSET.y / CAMERA_OFFSET.z` par unité avancée vers elle. Pour sortir
 * de sous le toit, il doit franchir tout le débord **avant** d'atteindre la
 * sous-face : la hauteur perdue est donc le débord *multiplié* par cette pente.
 *
 * La première version divisait. Elle réservait 0,7 fois le débord au lieu de
 * 1,43 — soit à peine la moitié de ce qu'il faut. Sur les quatre maisons, dont
 * le débord est petit, l'écart tenait dans la marge de sécurité et ne se voyait
 * pas ; sur le hall, débord 0,55 et colonnade, il mangeait les deux tiers de la
 * plaque. Une erreur de ce genre ne se rattrape pas à l'œil : elle attend le
 * bâtiment qui la révèle.
 */
export const eaveOcclusion = (overhang: number): number =>
  overhang * (CAMERA_OFFSET[1] / CAMERA_OFFSET[2]);
