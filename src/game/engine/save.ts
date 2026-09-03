import type { Direction } from './direction';
import { PHASES, type Phase } from '../world/dayNight';

/**
 * Sauvegarde locale de la partie.
 *
 * Sans elle, un visiteur qui revient repart du spawn : tout ce qu'il a visité
 * est perdu, et le jeu ne garde aucune trace de son passage. C'est ce qui
 * sépare une démo d'un lieu où l'on revient.
 */
export interface SaveData {
  /** Incrémenté à chaque changement de forme : une sauvegarde d'une version
   *  antérieure est ignorée plutôt que lue de travers. */
  version: number;
  mapId: string;
  tile: { x: number; y: number };
  facing: Direction;
  /** Identifiants des quêtes dont la fiche a été ouverte. */
  questsSeen: string[];
  /** Clés des technos dont la fiche a été ouverte. */
  techsSeen: string[];
  /** Son coupé : un réglage qu'on ne veut pas réactiver à chaque visite. */
  muted: boolean;
  /**
   * Phase forcée depuis le menu, ou `null` si l'ambiance suit l'horloge.
   *
   * Facultative, comme la sourdine : une sauvegarde qui l'ignore reste
   * valide et repart sur l'heure réelle. Bousculer `SAVE_VERSION` pour un
   * réglage de confort jetterait la progression de tout le monde.
   */
  phase: Phase | null;
  savedAt: number;
}

export const SAVE_VERSION = 1;
const KEY = 'uppercase-plus/save';

const DIRECTIONS: readonly Direction[] = ['up', 'down', 'left', 'right'];

const isStringArray = (v: unknown): v is string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string');

/**
 * Analyse et valide une sauvegarde sérialisée.
 *
 * Le contenu de `localStorage` n'est pas digne de confiance : il survit aux
 * changements de carte, aux refactors, et à une console ouverte. Une donnée
 * douteuse renvoie `null` — on repart du début, ce qui est toujours préférable
 * à un joueur téléporté dans un mur.
 *
 * Séparée de la lecture du stockage pour rester testable hors navigateur : la
 * validation est justement la partie qui mérite des tests.
 */
export function parseSave(raw: string | null, isKnownMap: (id: string) => boolean): SaveData | null {
  if (!raw) return null;

  try {
    const data = JSON.parse(raw) as Partial<SaveData>;
    if (data.version !== SAVE_VERSION) return null;
    if (typeof data.mapId !== 'string' || !isKnownMap(data.mapId)) return null;
    if (!data.tile || typeof data.tile.x !== 'number' || typeof data.tile.y !== 'number') return null;
    if (!DIRECTIONS.includes(data.facing as Direction)) return null;
    if (!isStringArray(data.questsSeen) || !isStringArray(data.techsSeen)) return null;

    return {
      version: SAVE_VERSION,
      mapId: data.mapId,
      tile: { x: data.tile.x, y: data.tile.y },
      facing: data.facing as Direction,
      questsSeen: data.questsSeen,
      techsSeen: data.techsSeen,
      muted: data.muted === true,
      phase: PHASES.includes(data.phase as Phase) ? (data.phase as Phase) : null,
      savedAt: typeof data.savedAt === 'number' ? data.savedAt : 0,
    };
  } catch {
    return null;
  }
}

export function readSave(isKnownMap: (id: string) => boolean): SaveData | null {
  if (typeof window === 'undefined') return null;
  try {
    return parseSave(window.localStorage.getItem(KEY), isKnownMap);
  } catch {
    return null; // stockage refusé (navigation privée, réglages stricts)
  }
}

export function writeSave(data: Omit<SaveData, 'version' | 'savedAt'>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ ...data, version: SAVE_VERSION, savedAt: Date.now() }),
    );
  } catch {
    // Quota plein ou stockage refusé : on joue sans sauvegarde, sans le dire.
  }
}

export function clearSave(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* rien à faire */
  }
}
