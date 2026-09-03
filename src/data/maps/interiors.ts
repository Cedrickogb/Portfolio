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
      lines: {
        en: [
          "Welcome to the quest registry.",
          "Every shipped project is logged here, with its stack.",
          "Let me pull up the list.",
        ],
        fr: [
          "Bienvenue au registre des quêtes.",
          "Chaque projet livré y est consigné, avec sa pile technique.",
          "Je te sors la liste tout de suite.",
        ],
      },
      farewell: {
        en: ["The registry stays open. Come back any time."],
        fr: ["Le registre reste ouvert. Reviens quand tu veux."],
      },
    },
  },
  dialogues: {
    '1': {
      en: [
        "Quest registry.",
        "Ask at the counter to see the list.",
      ],
      fr: [
        "Registre des quêtes.",
        "Adresse-toi au comptoir pour consulter la liste.",
      ],
    },
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
      lines: {
        en: [
          "This is where the technology inventory is kept.",
          "Each one carries its years of practice and its projects.",
          "See for yourself.",
        ],
        fr: [
          "Ici on tient l'inventaire des technologies.",
          "Chacune a ses années de pratique et ses projets.",
          "Regarde par toi-même.",
        ],
      },
      farewell: {
        en: ["The inventory is up to date. See you around."],
        fr: ["L'inventaire est à jour. À la prochaine."],
      },
    },
  },
  dialogues: {
    '1': {
      en: [
        "Stack inventory.",
        "The counter opens the sheet for every technology.",
      ],
      fr: [
        "Inventaire des stacks.",
        "Le comptoir donne accès a la fiche de chaque techno.",
      ],
    },
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
      lines: {
        en: [
          "The workbench. Everything ships from here.",
          "Four years putting software into production,",
          "from web configurators to a SaaS platform.",
          "Take the CV, it is up to date.",
        ],
        fr: [
          "Le poste de travail. C'est d'ici que tout sort.",
          "Quatre ans à livrer du logiciel en production,",
          "des configurateurs web jusqu'à une plateforme SaaS.",
          "Prends le CV, il est à jour.",
        ],
      },
      farewell: {
        en: ["Enjoy the tour."],
        fr: ["Bonne exploration."],
      },
    },
  },
  dialogues: {
    '1': {
      en: [
        "Laboratory. Workbench, notes and CV.",
      ],
      fr: [
        "Laboratoire. Poste de travail, notes et CV.",
      ],
    },
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
      lines: {
        en: [
          "Welcome to the contact centre.",
          "We can restore a project to full health,",
          "or just talk it over with a coffee.",
          "Leave me your message, it will reach him.",
        ],
        fr: [
          "Bienvenue au centre de contact.",
          "On peut restaurer un projet à pleine santé,",
          "ou simplement en discuter autour d'un café.",
          "Laisse-moi ton message, il sera transmis.",
        ],
      },
      farewell: {
        en: ["Noted. Safe travels."],
        fr: ["C'est noté. Bonne route."],
      },
    },
  },
  dialogues: {
    '1': {
      en: [
        "Contact centre. Leave a message at the counter.",
      ],
      fr: [
        "Centre de contact. Laisse un message au comptoir.",
      ],
    },
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
    '1': {
      en: [
        "Trophy hall.",
        "One stele per step of the journey. Walk up to read.",
      ],
      fr: [
        "Hall des trophées.",
        "Une stèle par étape du parcours. Approche-toi pour lire.",
      ],
    },
  },
};
