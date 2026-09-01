import type { GameMap } from '@/game/engine/grid';

/** Le bourg : la carte extérieure.
 *
 *  Légende
 *    '.' herbe   '=' terre   'o' dalles   '^' hautes herbes   '*' massif
 *    'D' paillasson (praticable, déclenche l'entrée)   '#' mur
 *    'H' bâtiment (bloc rectangulaire)   'T' arbre   'L' lampadaire   'F' clôture
 *    'P' spawn   '1'..'9' panneau
 *
 *  Les paillassons sont posés *devant* les façades, jamais dedans : la case
 *  d'arrivée d'une téléportation est toujours voisine d'un paillasson, jamais
 *  dessus, sans quoi entrer relancerait aussitôt la sortie.
 */
export const TOWN_MAP: GameMap = {
  name: 'Bourg',
  rows: [
  '########################################',
  '#......................................#',
  '#..HHHHH......HHHHHH...................#',
  '#..HHHHH......HHHHHH.....HHHHHH........#',
  '#..HHHHH..TT..HHHHHH..T..HHHHHH..TT....#',
  '#..HHHHH......HHHHHH.....HHHHHH..T.....#',
  '#..**D.*......**D.**.....HHHHHH........#',
  '#............*********...**D.**........#',
  '#...........1ooooooooo.................#',
  '#.......====Looooooooo====.............#',
  '#..FFFF.=====ooooooooo====.............#',
  '#............ooooooo2o.L............T..#',
  '#.......HHHHHL..oooo.L.................#',
  '#.......HHHHH...oooo....FFFFFF.........#',
  '#.......HHHHH....==....................#',
  '#.T.....HHHHH...P==....................#',
  '#.........D.....4==....................#',
  '#.....T.......T..==.........^^^^^^^^^..#',
  '#..........3.....==.........^^^^^^^^^..#',
  '#.^^^^^^^^^^^^...==....T....^^^^^^^^^..#',
  '#.^^^^^^^^^^^^...==.........^^^^^^^^^..#',
  '#.^^^^^^^^^^^^...==.........^^^^^^^^^..#',
  '#.^^^^^^^^^^^^........T................#',
  '#......................................#',
  '########################################',
  ],
  buildings: {
    '3,2': { label: 'LAB', style: 'lab' },
    '14,2': { label: 'QUESTS', style: 'quests' },
    '25,3': { label: 'STACKS', style: 'stacks' },
    '8,12': { label: 'CONTACT', style: 'contact' },
  },
  warps: {
    '5,6': { to: 'lab', at: { x: 8, y: 10 }, facing: 'up' },
    '16,6': { to: 'quests', at: { x: 8, y: 10 }, facing: 'up' },
    '27,7': { to: 'stacks', at: { x: 8, y: 10 }, facing: 'up' },
    '10,16': { to: 'contact', at: { x: 8, y: 10 }, facing: 'up' },
  },
  dialogues: {
    '4': [
      "Bourg d'Uppercase+. Marche sur un paillasson pour entrer.",
      "A, Entree ou Espace pour parler. B ou Echap pour fermer.",
    ],
    '1': [
      "A l'ouest, le LAB : le poste de travail et le CV.",
      "Au nord, QUESTS : le registre des projets livres.",
    ],
    '2': [
      "A l'est, STACKS : l'inventaire des technologies.",
      "Au sud, CONTACT : pour laisser un message.",
    ],
    '3': [
      "Au sud, les hautes herbes. Rien n'y attend personne,",
      "c'est juste plus joli qu'une pelouse tondue.",
    ],
  },
};
