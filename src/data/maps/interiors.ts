import type { GameMap } from '@/game/engine/grid';

/**
 * Intérieurs des bâtiments.
 *
 * Tous partagent le même gabarit — salle de 17x13, comptoir en travers,
 * personnage derrière, sortie au sud. Ce gabarit commun n'est pas de la
 * paresse : c'est ce qui rend un intérieur immédiatement lisible, exactement
 * comme les boutiques d'un même jeu se ressemblent toutes. Ce sont le
 * revêtement du sol, le mur et le mobilier qui distinguent les pôles.
 *
 * Légende propre aux intérieurs : 'C' comptoir, 'S' rayonnage, 'V' plante,
 * 'M' terminal, 'X' piédestal, 'D' paillasson de sortie.
 *
 * Le hall fait exception au gabarit : plus vaste, sans comptoir ni personnage.
 * On n'y vient pas demander quelque chose, on y circule entre des stèles.
 *
 * Chaque sortie renvoie sur la case *voisine* du paillasson extérieur, jamais
 * dessus : arriver sur une case de téléportation relancerait aussitôt le
 * voyage inverse.
 */

export const QUESTS_INTERIOR: GameMap = {
  name: 'Registre des quetes',
  interior: true,
  interiorStyle: 'quests',
  rows: [
    '#################',
    '#################',
    '#wwwwwwwwwwwwwww#',
    '#wSSwwwwwwwwwMSw#',
    '#wwwwwwwNwwwwwww#',
    '#CCCCCCCCCCCCCCC#',
    '#wwwwwwwwwwwwwww#',
    '#wwwwwwwwwwwwwww#',
    '#w1wwwwwwwwwwwww#',
    '#wVwwwwwwwwwwwVw#',
    '#wwwwwwwPwwwwwww#',
    '#wwwwwwwDwwwwwww#',
    '#################',
  ],
  warps: {
    '8,11': { to: 'world', at: { x: 14, y: 45 }, facing: 'down' },
  },
  npcs: {
    '8,4': {
      look: 'clerk',
      menu: 'quests',
      lines: [
        "Bienvenue au registre des quetes.",
        "Chaque projet livre y est consigne, avec sa pile technique.",
        "Je te sors la liste tout de suite.",
      ],
      farewell: [
        "Le registre reste ouvert. Reviens quand tu veux.",
      ],
    },
  },
  dialogues: {
    '1': [
      "Registre des quetes.",
      "Adresse-toi au comptoir pour consulter la liste.",
    ],
  },
};

export const STACKS_INTERIOR: GameMap = {
  name: 'Inventaire des stacks',
  interior: true,
  interiorStyle: 'stacks',
  rows: [
    '#################',
    '#################',
    '#wwwwwwwwwwwwwww#',
    '#wSSSwwwwwwwSSSw#',
    '#wwwwwwwNwwwwwww#',
    '#CCCCCCCCCCCCCCC#',
    '#wwwwwwwwwwwwwww#',
    '#wwwwwwwwwwwwwww#',
    '#w1wwwwwwwwwwwww#',
    '#wVwwwwwwwwwwwMw#',
    '#wwwwwwwPwwwwwww#',
    '#wwwwwwwDwwwwwww#',
    '#################',
  ],
  warps: {
    '8,11': { to: 'world', at: { x: 78, y: 45 }, facing: 'down' },
  },
  npcs: {
    '8,4': {
      look: 'keeper',
      menu: 'stacks',
      lines: [
        "Ici on tient l'inventaire des technologies.",
        "Chacune a ses annees de pratique et ses projets.",
        "Regarde par toi-meme.",
      ],
      farewell: [
        "L'inventaire est a jour. A la prochaine.",
      ],
    },
  },
  dialogues: {
    '1': [
      "Inventaire des stacks.",
      "Le comptoir donne acces a la fiche de chaque techno.",
    ],
  },
};

export const LAB_INTERIOR: GameMap = {
  name: 'Laboratoire',
  interior: true,
  interiorStyle: 'lab',
  rows: [
    '#################',
    '#################',
    '#wwwwwwwwwwwwwww#',
    '#wMMMwwwwwwwwwSw#',
    '#wwwwwwwNwwwwwww#',
    '#CCCCCCCCCCCCCCC#',
    '#wwwwwwwwwwwwwww#',
    '#wwwwwwwwwwwwwww#',
    '#w1wwwwwwwwwwwww#',
    '#wVwwwwwwwwwwwVw#',
    '#wwwwwwwPwwwwwww#',
    '#wwwwwwwDwwwwwww#',
    '#################',
  ],
  warps: {
    '8,11': { to: 'world', at: { x: 14, y: 15 }, facing: 'down' },
  },
  npcs: {
    '8,4': {
      look: 'self',
      menu: 'cv',
      lines: [
        "Le poste de travail. C'est d'ici que tout sort.",
        "Quatre ans a livrer du logiciel en production,",
        "des configurateurs web jusqu'a une plateforme SaaS.",
        "Prends le CV, il est a jour.",
      ],
      farewell: [
        "Bonne exploration.",
      ],
    },
  },
  dialogues: {
    '1': [
      "Laboratoire. Poste de travail, notes et CV.",
    ],
  },
};

export const CONTACT_INTERIOR: GameMap = {
  name: 'Centre de contact',
  interior: true,
  interiorStyle: 'contact',
  rows: [
    '#################',
    '#################',
    '#wwwwwwwwwwwwwww#',
    '#wMwwwwwwwwwwSSw#',
    '#wwwwwwwNwwwwwww#',
    '#CCCCCCCCCCCCCCC#',
    '#wwwwwwwwwwwwwww#',
    '#wwwwwwwwwwwwwww#',
    '#w1wwwwwwwwwwwww#',
    '#wVwwwwwwwwwwwVw#',
    '#wwwwwwwPwwwwwww#',
    '#wwwwwwwDwwwwwww#',
    '#################',
  ],
  warps: {
    '8,11': { to: 'world', at: { x: 46, y: 53 }, facing: 'down' },
  },
  npcs: {
    '8,4': {
      look: 'nurse',
      menu: 'contact',
      lines: [
        "Bienvenue au centre de contact.",
        "On peut restaurer un projet a pleine sante,",
        "ou simplement en discuter autour d'un cafe.",
        "Laisse-moi ton message, il sera transmis.",
      ],
      farewell: [
        "C'est note. Bonne route.",
      ],
    },
  },
  dialogues: {
    '1': [
      "Centre de contact. Laisse un message au comptoir.",
    ],
  },
};

export const HALL_INTERIOR: GameMap = {
  name: 'Hall des trophees',
  interior: true,
  interiorStyle: 'hall',
  /* La seule salle qui se visite en volume. Voir `HallScene`. */
  spatial: true,
  rows: [
    '###################',
    '###################',
    '#wwwwwwwwwwwwwwwww#',
    '#wVwwwwwwwwwwwwwVw#',
    '#wwwwwwwwwwwwwwwww#',
    '#wwwwXwwwXwwwXwwww#',
    '#wwwwwwwwwwwwwwwww#',
    '#wwwwwwwwwwwwwwwww#',
    '#w1wwwwwwwwwwwwwww#',
    '#wwwwwwwwwwwwwwwww#',
    '#wwwwwwwwwwwwwwwww#',
    '#wVwwwwwwwwwwwwwVw#',
    '#wwwwwwwwPwwwwwwww#',
    '#wwwwwwwwDwwwwwwww#',
    '###################',
  ],
  warps: {
    '9,13': { to: 'world', at: { x: 76, y: 15 }, facing: 'down' },
  },
  trophies: {
    '5,5': 'vertim-coders',
    '9,5': '41devs',
    '13,5': 'anip',
  },
  dialogues: {
    '1': [
      "Hall des trophees.",
      "Une stele par etape du parcours. Approche-toi pour lire.",
    ],
  },
};
