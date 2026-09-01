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
  '####################################################',
  '#..................................................#',
  '#...................HHHHHHHHH......................#',
  '#...................HHHHHHHHH......................#',
  '#...................HHHHHHHHH...........^^^^^^^^^..#',
  '#...................HHHHHHHHH...........^^^^^^^^^..#',
  '#...................HHHHHHHHH...........^^^^^^^^^..#',
  '#...................HHHHHHHHH...........^^^^^^^^^..#',
  '#...............T..oooooDooooo....T.....^^^^^^^^^..#',
  '#.................5ooLoooooLoo.....................#',
  '#..................****===****.....................#',
  '#.T.T.T.T.T.T.T.T.T.T.T===T.T.T.T.T.T.T.T.T.T.T.T..#',
  '#......................===.........................#',
  '#...........................................T......#',
  '#..HHHHH......HHHHHH..................TT...........#',
  '#..HHHHH......HHHHHH........HHHHHH....T............#',
  '#..HHHHH..TT..HHHHHH....T...HHHHHH.................#',
  '#..HHHHH......HHHHHH........HHHHHH.................#',
  '#..**D.*......**D.**........HHHHHH.................#',
  '#............*********......**D.**.................#',
  '#.T.........1ooooooooo.............................#',
  '#.......====Looooooooo======.......................#',
  '#..FFFF.=====ooooooooo=====L.......................#',
  '#............ooooooooo........FFFFFF...............#',
  '#.......HHHHHL..oooo.L.2.............^^^^^^^^^^^...#',
  '#.......HHHHH.T.Pooo.................^^^^^^^^^^^...#',
  '#.....T.HHHHH3..4==..................^^^^^^^^^^^...#',
  '#.......HHHHH....==.......T..........^^^^^^^^^^^...#',
  '#.........D......==..................^^^^^^^^^^^...#',
  '#.^^^^^^^^^......==................................#',
  '#.^^^^^^^^^...........T............................#',
  '####################################################'
  ],
  buildings: {
    '3,14': { label: 'LAB', style: 'lab' },
    '14,14': { label: 'QUESTS', style: 'quests' },
    '28,15': { label: 'STACKS', style: 'stacks' },
    '8,24': { label: 'CONTACT', style: 'contact' },
    '20,2': { label: 'HALL', style: 'hall' },
  },
  warps: {
    '5,18': { to: 'lab', at: { x: 8, y: 10 }, facing: 'up' },
    '16,18': { to: 'quests', at: { x: 8, y: 10 }, facing: 'up' },
    '30,19': { to: 'stacks', at: { x: 8, y: 10 }, facing: 'up' },
    '10,28': { to: 'contact', at: { x: 8, y: 10 }, facing: 'up' },
    '24,8': { to: 'hall', at: { x: 9, y: 12 }, facing: 'up' },
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
    '5': [
      "Hall des trophees.",
      "Le parcours professionnel, une stele par etape.",
      "Approche-toi d'un piedestal pour lire sa plaque.",
    ],
  },
};
