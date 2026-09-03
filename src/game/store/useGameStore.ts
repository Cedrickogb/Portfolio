import { create } from 'zustand';
import type { Tile, Travel } from '@/game/engine/grid';
import type { Direction } from '@/game/engine/direction';
import { phaseAt, type Phase } from '@/game/world/dayNight';


/** Menu ouvert à la fin d'un dialogue. */
export type MenuKind = 'quests' | 'stacks' | 'contact' | 'cv' | 'start' | 'map';

interface DialogueState {
  lines: string[];
  index: number;
  /** Nombre de caractères déjà affichés sur la ligne courante (effet machine à écrire). */
  revealed: number;
  /** Menu à ouvrir une fois la dernière ligne passée. */
  then?: MenuKind;
}

interface GameState {
  /** Position logique, mise à jour d'un coup au début du pas : c'est la vérité. */
  tile: Tile;
  facing: Direction;
  /** Pas en cours. Seul l'affichage est interpolé, la logique reste discrète. */
  step: { from: Tile; startedAt: number } | null;
  dialogue: DialogueState | null;
  /** Carte courante. */
  mapId: string;
  /** Case d'arrivée imposée après une téléportation. */
  /** Menu de liste ouvert, s'il y en a un. */
  menu: MenuKind | null;
  /** Ligne sélectionnée dans le menu courant. */
  menuCursor: number;
  /** Réplique de congé à jouer en quittant le comptoir. */
  farewell: string[] | null;
  /** Fiche de projet ouverte, s'il y en a une. */
  questId: string | null;
  /** Fiche de techno ouverte, s'il y en a une. */
  techKey: string | null;
  /** Quêtes et technos dont la fiche a déjà été ouverte : la progression. */
  questsSeen: string[];
  techsSeen: string[];
  /** Vrai une fois la sauvegarde relue : avant, on n'écrit rien. */
  hydrated: boolean;
  /** Une partie précédente a été retrouvée : l'écran titre propose de reprendre. */
  resumable: boolean;
  /** Faux tant que l'écran titre n'a pas été franchi. */
  started: boolean;
  /** Son coupé. Persisté avec la sauvegarde. */
  muted: boolean;
  /** Mode de déplacement : à pied, à vélo, ou en barque. */
  travel: Travel;
  /** Territoire courant, pour la musique et le bandeau d'entrée. */
  territory: string | null;
  /** Moment de la journée. */
  phase: Phase;
  /**
   * Point de vue dans les salles en 3D.
   *
   * Sans effet sur les cartes en vue de dessus : là, la caméra est fixe par
   * construction. C'est un réglage du hall.
   */
  view: 'first' | 'third';
  /** Vrai tant que la phase suit l'horloge du visiteur. */
  phaseAuto: boolean;

  spawnAt: (tile: Tile) => void;
  face: (dir: Direction) => void;
  beginStep: (to: Tile, now: number) => void;
  endStep: () => void;
  warpTo: (mapId: string, tile: Tile, facing: Direction, interior: boolean) => void;
  openMenu: (menu: MenuKind) => void;
  closeMenu: () => void;
  setMenuCursor: (index: number) => void;
  hydrate: (state: Partial<GameState>) => void;
  start: () => void;
  setMutedState: (muted: boolean) => void;
  setTravel: (travel: Travel) => void;
  setTerritory: (id: string | null) => void;
  setPhase: (phase: Phase, auto: boolean) => void;
  setView: (view: 'first' | 'third') => void;
  resetProgress: (mapId: string, tile: Tile) => void;
  openQuest: (id: string) => void;
  closeQuest: () => void;
  openTech: (key: string) => void;
  closeTech: () => void;
  openDialogue: (lines: string[], then?: MenuKind, farewell?: string[]) => void;
  revealLine: () => void;
  tickReveal: () => void;
  advanceDialogue: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  tile: { x: 0, y: 0 },
  facing: 'down',
  step: null,
  dialogue: null,
  mapId: 'world',
  menu: null,
  menuCursor: 0,
  farewell: null,
  questId: null,
  techKey: null,
  questsSeen: [],
  techsSeen: [],
  hydrated: false,
  resumable: false,
  started: false,
  muted: false,
  travel: 'foot',
  territory: null,
  /* Première valeur lue à la construction du store : le monde s'affiche du bon
     ton dès la première image, sans un éclair de plein jour au chargement. */
  phase: phaseAt(new Date()),
  phaseAuto: true,
  view: 'third',

  spawnAt: (tile) => set({ tile, step: null, dialogue: null, questId: null, techKey: null, menu: null }),

  /**
   * Franchissement d'une porte.
   *
   * La carte **et** la case d'arrivée changent dans la même mise à jour. La
   * version précédente ne posait qu'une intention (`pendingSpawn`) qu'un effet
   * du joueur consommait ensuite : or le joueur vit dans le rendu du canvas,
   * qui est un *autre* réconciliateur React que celui du DOM. L'intention lui
   * parvenait donc une image avant la nouvelle carte — il se plaçait aux
   * coordonnées de l'intérieur alors qu'il était encore dehors, et quand la
   * carte arrivait enfin, l'intention était déjà consommée : retour au point
   * de départ. Sortir d'un bâtiment renvoyait au spawn du monde.
   *
   * Deux sources de vérité qui se croisent, ça ne se rattrape pas par un garde
   * de plus ; il n'en faut qu'une, et c'est le store.
   */
  warpTo: (mapId, tile, facing, interior) =>
    set((s) => ({
      mapId,
      tile,
      facing,
      step: null,
      dialogue: null,
      // On n'entre ni en barque ni à vélo dans un bâtiment.
      travel: interior || s.travel === 'boat' ? 'foot' : s.travel,
    })),

  openMenu: (menu) => set({ menu, menuCursor: 0 }),

  /* Quitter un comptoir sans un mot donne l'impression d'avoir coupé la
     conversation. On rejoue donc la réplique de congé du personnage, une fois. */
  setMenuCursor: (index) => set({ menuCursor: index }),

  closeMenu: () =>
    set((s) =>
      s.farewell
        ? { menu: null, menuCursor: 0, farewell: null, dialogue: { lines: s.farewell, index: 0, revealed: 0 } }
        : { menu: null, menuCursor: 0 },
    ),
  openTech: (key) =>
    set((s) => ({
      techKey: key,
      techsSeen: s.techsSeen.includes(key) ? s.techsSeen : [...s.techsSeen, key],
    })),
  closeTech: () => set({ techKey: null }),

  face: (dir) => {
    if (get().facing !== dir) set({ facing: dir });
  },

  beginStep: (to, now) =>
    set((s) => ({ step: { from: s.tile, startedAt: now }, tile: to })),

  endStep: () => set({ step: null }),

  hydrate: (state) => set({ ...state, hydrated: true }),

  start: () => set({ started: true }),

  setMutedState: (muted) => set({ muted }),

  setTravel: (travel) => set({ travel }),

  setTerritory: (territory) => set({ territory }),

  setPhase: (phase, auto) => set({ phase, phaseAuto: auto }),

  setView: (view) => set({ view }),

  /* Nouvelle partie : on efface la progression et on renvoie au point de
     départ, sans recharger la page — le monde est déjà en mémoire. */
  resetProgress: (mapId, tile) =>
    set({
      mapId,
      tile,
      facing: 'down',
      step: null,
      questsSeen: [],
      techsSeen: [],
      menu: null,
      questId: null,
      techKey: null,
      dialogue: null,
    }),

  openQuest: (id) =>
    set((s) => ({
      questId: id,
      questsSeen: s.questsSeen.includes(id) ? s.questsSeen : [...s.questsSeen, id],
    })),

  closeQuest: () => set({ questId: null }),

  openDialogue: (lines, then, farewell) =>
    set({ dialogue: { lines, index: 0, revealed: 0, then }, farewell: farewell ?? null }),

  revealLine: () =>
    set((s) =>
      s.dialogue
        ? { dialogue: { ...s.dialogue, revealed: s.dialogue.lines[s.dialogue.index].length } }
        : s,
    ),

  tickReveal: () =>
    set((s) => {
      if (!s.dialogue) return s;
      const full = s.dialogue.lines[s.dialogue.index].length;
      if (s.dialogue.revealed >= full) return s;
      return { dialogue: { ...s.dialogue, revealed: s.dialogue.revealed + 1 } };
    }),

  advanceDialogue: () =>
    set((s) => {
      if (!s.dialogue) return s;
      const next = s.dialogue.index + 1;
      if (next < s.dialogue.lines.length) {
        return { dialogue: { ...s.dialogue, index: next, revealed: 0 } };
      }
      // Fin du dialogue : on enchaîne sur le menu annoncé, s'il y en a un.
      const menu = s.dialogue.then ?? null;
      // Le curseur repart en tête à chaque ouverture de menu.
      // Sans menu à enchaîner, la réplique de congé n'a plus lieu d'être.
      return menu
        ? { dialogue: null, menu, menuCursor: 0 }
        : { dialogue: null, menu: null, farewell: null };
    }),
}));
