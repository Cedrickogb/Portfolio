import { create } from 'zustand';
import type { Tile, Travel } from '@/game/engine/grid';
import type { Direction } from '@/game/engine/direction';


/** Menu ouvert à la fin d'un dialogue. */
export type MenuKind = 'quests' | 'stacks' | 'contact' | 'cv' | 'start';

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
  pendingSpawn: { tile: Tile; facing: Direction } | null;
  /** Vrai pendant le fondu au noir d'une transition. */
  warping: boolean;
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
  /** Faux tant que l'écran titre n'a pas été franchi. */
  started: boolean;
  /** Son coupé. Persisté avec la sauvegarde. */
  muted: boolean;
  /** Mode de déplacement : à pied, à vélo, ou en barque. */
  travel: Travel;
  /** Territoire courant, pour la musique et le bandeau d'entrée. */
  territory: string | null;

  spawnAt: (tile: Tile) => void;
  face: (dir: Direction) => void;
  beginStep: (to: Tile, now: number) => void;
  endStep: () => void;
  warpTo: (mapId: string, tile: Tile, facing: Direction) => void;
  consumeSpawn: () => void;
  openMenu: (menu: MenuKind) => void;
  closeMenu: () => void;
  setMenuCursor: (index: number) => void;
  hydrate: (state: Partial<GameState>) => void;
  start: () => void;
  setMutedState: (muted: boolean) => void;
  setTravel: (travel: Travel) => void;
  setTerritory: (id: string | null) => void;
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
  mapId: 'town',
  pendingSpawn: null,
  warping: false,
  menu: null,
  menuCursor: 0,
  farewell: null,
  questId: null,
  techKey: null,
  questsSeen: [],
  techsSeen: [],
  hydrated: false,
  started: false,
  muted: false,
  travel: 'foot',
  territory: null,

  spawnAt: (tile) => set({ tile, step: null, dialogue: null, questId: null, techKey: null, menu: null }),

  warpTo: (mapId, tile, facing) =>
    set((s) => ({
      mapId,
      pendingSpawn: { tile, facing },
      warping: true,
      step: null,
      dialogue: null,
      // On n'entre pas dans un bâtiment en barque.
      travel: s.travel === 'boat' ? 'foot' : s.travel,
    })),

  consumeSpawn: () => set({ pendingSpawn: null, warping: false }),

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

  /* Nouvelle partie : on efface la progression et on renvoie au point de
     départ, sans recharger la page — le monde est déjà en mémoire. */
  resetProgress: (mapId, tile) =>
    set({
      mapId,
      pendingSpawn: { tile, facing: 'down' },
      warping: true,
      questsSeen: [],
      techsSeen: [],
      menu: null,
      questId: null,
      techKey: null,
      dialogue: null,
      step: null,
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
