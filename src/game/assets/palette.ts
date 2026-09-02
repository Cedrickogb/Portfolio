/**
 * Palette unique du jeu. Toutes les tuiles, tous les sprites et toutes les faces
 * de géométrie tirent leurs couleurs d'ici — c'est ce qui fait que le décor 3D
 * et les sprites 2D appartiennent visuellement au même monde.
 *
 * Registre visé : les verts pâles et les gris-vert clairs des overworlds
 * portables, plutôt que des verts saturés. Les cinq premières entrées sont les
 * tokens de marque déjà présents dans tailwind.config.ts, pour que le jeu et le
 * site classique partagent leur identité.
 */
export const PALETTE = {
  // Marque
  primary: '#76C829',
  primaryDark: '#4da014',
  primaryLight: '#a3e05c',
  hpRed: '#e63946',
  xpBlue: '#4cc9f0',

  // Herbe : volontairement claire et un peu jaune
  grassHi: '#c3e88d',
  grassLight: '#a7d977',
  grass: '#8ac45f',
  grassDark: '#6aa845',

  // Hautes herbes : les zones sombres qui découpent la carte
  tallGrass: '#4e9138',
  tallGrassDark: '#39692a',

  // Dalles et places, en gris-vert clair
  stoneHi: '#d8dccf',
  stoneLight: '#b9c2ad',
  stone: '#98a38d',
  stoneDark: '#77836e',

  // Eau
  waterHi: '#8fd6e8',
  water: '#4b9fc4',
  waterDeep: '#2f6f92',

  // Grèves
  sandHi: '#f2e2b6',
  sand: '#dcc68d',
  sandDark: '#bda568',

  // Roche du plateau
  rockHi: '#b9ad96',
  rock: '#95886f',
  rockDark: '#6f6552',

  // Lande fraîche du vallon
  moorHi: '#7fc08a',
  moor: '#5fa06d',
  moorDark: '#437a4f',

  // Terre battue
  dirtLight: '#d2b98a',
  dirt: '#b89a68',
  dirtDark: '#8f7448',

  // Toitures — une teinte par style de bâtiment
  roofLight: '#5cbf60',
  roof: '#3f9e46',
  roofDark: '#2c7132',
  roofRedLight: '#e0705c',
  roofRed: '#c2503f',
  roofRedDark: '#8e3729',
  roofBlueLight: '#5f96d8',
  roofBlue: '#3f72b8',
  roofBlueDark: '#2a5087',
  roofTealLight: '#4fc9ba',
  roofTeal: '#2fa89a',
  roofTealDark: '#1e7a6f',
  /** Cuivre : réservé au hall des trophées, pour qu'un monument ne se
   *  confonde avec aucune maison du bourg. */
  roofCopperLight: '#e6ab5c',
  roofCopper: '#c98a3f',
  roofCopperDark: '#96632a',
  /** Le quadrillage clair sur les toits, commun à tous les styles. */
  roofLine: '#e2f3d8',

  // Façades — trois familles de crépi
  wallHi: '#f4edd6',
  wall: '#e2d7b2',
  wallDark: '#c2b48a',
  wallWarmHi: '#f7e3c4',
  wallWarm: '#e8c9a0',
  wallWarmDark: '#c4a276',
  wallGreyHi: '#e8ebe4',
  wallGrey: '#cfd3cb',
  wallGreyDark: '#a7ada2',

  // Vitrages
  glassHi: '#bde9f7',
  glass: '#8fd3e8',
  glassDark: '#5aa8c4',

  trim: '#a9713d',
  trimDark: '#7d5029',

  // Bois et clôtures
  woodLight: '#d3ab6d',
  wood: '#b58c4f',
  woodDark: '#7d5c30',

  // Massifs fleuris
  flowerHi: '#fff3ec',
  flowerPink: '#f4948b',
  flowerRed: '#d94b41',

  // Personnage
  skinHi: '#b07a48',
  skin: '#95603a',
  skinShade: '#6f4527',
  hair: '#241a13',
  hairHi: '#3d2d20',
  shirt: '#4a8fd8',
  shirtShade: '#2f6bb0',
  /* Volontairement clairs : à 18 px de haut, un bas de corps sombre fusionne
     avec le contour et le personnage n'a plus que sa tête de lisible. */
  pants: '#6f7b98',
  pantsShade: '#505b74',
  /* Ni brun (il se confondrait avec la carnation) ni noir (il se confondrait
     avec le contour) : une ardoise très sombre tranche avec les deux. */
  shoe: '#2b3040',

  // Divers
  ink: '#1a1c18',
  white: '#fbfdf6',
  shadow: '#2a3324',
} as const;

export type PaletteColor = keyof typeof PALETTE;

