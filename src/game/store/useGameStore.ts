import { create } from 'zustand';
import type { Tile } from '@/game/engine/grid';
import type { Direction } from '@/game/engine/direction';


/** Menu ouvert à la fin d'un dialogue. */
export type MenuKind = 'quests' | 'stacks' | 'contact' | 'cv';

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

  spawnAt: (tile: Tile) => void;
  face: (dir: Direction) => void;
  beginStep: (to: Tile, now: number) => void;
  endStep: () => void;
  warpTo: (mapId: string, tile: Tile, facing: Direction) => void;
  consumeSpawn: () => void;
  openMenu: (menu: MenuKind) => void;
  closeMenu: () => void;
  setMenuCursor: (index: number) => void;
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

  spawnAt: (tile) => set({ tile, step: null, dialogue: null, questId: null, techKey: null, menu: null }),

  warpTo: (mapId, tile, facing) =>
    set({ mapId, pendingSpawn: { tile, facing }, warping: true, step: null, dialogue: null }),

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
  openTech: (key) => set({ techKey: key }),
  closeTech: () => set({ techKey: null }),

  face: (dir) => {
    if (get().facing !== dir) set({ facing: dir });
  },

  beginStep: (to, now) =>
    set((s) => ({ step: { from: s.tile, startedAt: now }, tile: to })),

  endStep: () => set({ step: null }),

  openQuest: (id) => set({ questId: id }),

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
