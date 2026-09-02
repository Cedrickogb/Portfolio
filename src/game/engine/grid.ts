import { DEFAULT_STYLE, isBuildingStyle, type BuildingStyleName } from '../assets/buildings';
import type { Direction } from './direction';

export interface Tile {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BuildingRect extends Rect {
  /** Texte de l'enseigne de façade, s'il y en a une. */
  label?: string;
  /** Style architectural : toiture, crépi, gabarit. */
  style: BuildingStyleName;
}

export interface BuildingSpec {
  label?: string;
  style?: string;
}

/** Téléportation d'une carte à l'autre. */
export interface Warp {
  /** Identifiant de la carte de destination. */
  to: string;
  /** Case d'arrivée sur cette carte. */
  at: Tile;
  /** Orientation à l'arrivée. */
  facing?: Direction;
}

/** Menus qu'un personnage peut ouvrir en fin de dialogue. */
export type NpcMenu = 'quests' | 'stacks' | 'contact' | 'cv';

export interface NpcSpec {
  lines: string[];
  /** Réplique de congé, jouée en refermant le menu du comptoir. */
  farewell?: string[];
  /** Menu ouvert une fois le dialogue terminé. */
  menu?: NpcMenu;
  /** Variante de couleurs du sprite. */
  look?: string;
  /** Orientation du personnage. Par défaut il regarde vers le sud. */
  facing?: Direction;
}

/** Onze natures de case : sept praticables, quatre obstacles. */
export type TileKind =
  | 'grass'
  | 'path'
  | 'plaza'
  | 'tall'
  | 'flower'
  | 'wood'
  | 'door'
  | 'wall'
  | 'prop'
  | 'sign'
  | 'building'
  | 'counter'
  | 'npc'
  | 'trophy'
  | 'water'
  | 'dock'
  | 'sand'
  | 'rock'
  | 'moor'
  | 'cliff';

/**
 * Modes de déplacement.
 *
 * Le franchissement dépend de ce sur quoi — ou dans quoi — on se déplace : à
 * pied on suit les chemins, en barque on ne suit que l'eau. Le vélo ne change
 * pas les règles, seulement la cadence.
 */
export type Travel = 'foot' | 'bike' | 'boat';

const ON_LAND: ReadonlySet<TileKind> = new Set<TileKind>([
  'grass', 'path', 'plaza', 'tall', 'flower', 'wood', 'door', 'dock',
  'sand', 'rock', 'moor',
]);

/** En barque : l'eau et les pontons, rien d'autre. */
const ON_WATER: ReadonlySet<TileKind> = new Set<TileKind>(['water', 'dock']);

/** Légende de la grille. 'grass' est le sol par défaut, donc non listé ici. */
const LEGEND: Record<string, TileKind> = {
  '#': 'wall',
  '=': 'path',
  'o': 'plaza',
  '^': 'tall',
  '*': 'flower',
  'w': 'wood',
  'D': 'door',
  'H': 'building',
  'T': 'prop',
  'L': 'prop',
  'F': 'prop',
  'S': 'prop',
  'V': 'prop',
  'M': 'prop',
  'C': 'counter',
  'N': 'npc',
  'X': 'trophy',
  '/': 'cliff',
  'B': 'prop',
  'b': 'prop',
  '~': 'water',
  'Q': 'dock',
  's': 'sand',
  'r': 'rock',
  'g': 'moor',
};

export interface GameMap {
  name: string;
  rows: string[];
  /** Répliques indexées par le caractère de la tuile ('1'..'9'). */
  dialogues: Record<string, string[]>;
  /** Bâtiments, indexés par le coin haut-gauche de l'emprise : "x,y". */
  buildings?: Record<string, BuildingSpec>;
  /** Téléportations, indexées par la case qui les déclenche : "x,y". */
  warps?: Record<string, Warp>;
  /** Personnages, indexés par leur case : "x,y". */
  npcs?: Record<string, NpcSpec>;
  /** Piédestaux : case -> identifiant d'une entrée de `EXPERIENCE_DATA`.
   *  La carte ne connaît que l'identifiant ; le contenu est résolu à
   *  l'affichage, comme pour les quêtes. */
  trophies?: Record<string, string>;
  /** Décor intérieur : change les matériaux des murs et du sol. */
  interior?: boolean;
  /** Style d'intérieur : sol, mur et couleur d'accent du pôle. */
  interiorStyle?: string;
}

export interface ParsedMap {
  name: string;
  width: number;
  height: number;
  interior: boolean;
  interiorStyle: string;
  kinds: TileKind[][];
  spawn: Tile;
  positions: {
    path: Tile[];
    plaza: Tile[];
    tall: Tile[];
    flower: Tile[];
    wood: Tile[];
    door: Tile[];
    wall: Tile[];
    sign: Tile[];
    counter: Tile[];
    trophy: Tile[];
    water: Tile[];
    dock: Tile[];
    sand: Tile[];
    rock: Tile[];
    moor: Tile[];
    cliff: Tile[];
    /** Décors bloquants, groupés par caractère de légende ('T', 'L', 'F'). */
    props: Record<string, Tile[]>;
  };
  buildings: BuildingRect[];
  signAt: Record<string, string>;
  warps: Record<string, Warp>;
  npcs: Record<string, NpcSpec>;
  npcTiles: Tile[];
  trophies: Record<string, string>;
  dialogues: Record<string, string[]>;
}

export const tileKey = (x: number, y: number) => `${x},${y}`;

/**
 * Regroupe les cases d'un même caractère en rectangles maximaux.
 *
 * C'est ce qui permet d'écrire un bâtiment comme un simple bloc de 'H' dans la
 * grille, au lieu de maintenir une liste d'emprises à côté de la carte. Une
 * emprise non rectangulaire est une erreur de saisie : on la signale.
 */
function findRectRegions(rows: string[], char: string): Rect[] {
  const height = rows.length;
  const width = rows[0].length;
  const taken = Array.from({ length: height }, () => new Array<boolean>(width).fill(false));
  const out: Rect[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rows[y][x] !== char || taken[y][x]) continue;

      let w = 0;
      while (x + w < width && rows[y][x + w] === char && !taken[y][x + w]) w++;

      let h = 1;
      const rowMatches = (ry: number) => {
        for (let dx = 0; dx < w; dx++) {
          if (rows[ry][x + dx] !== char || taken[ry][x + dx]) return false;
        }
        return true;
      };
      while (y + h < height && rowMatches(y + h)) h++;

      if (y + h < height && rows[y + h][x] === char) {
        throw new Error(
          `Emprise '${char}' non rectangulaire autour de (${x},${y}) : découpe-la en blocs rectangulaires`,
        );
      }

      for (let dy = 0; dy < h; dy++) {
        for (let dx = 0; dx < w; dx++) taken[y + dy][x + dx] = true;
      }
      out.push({ x, y, w, h });
    }
  }
  return out;
}

/**
 * Rattache enseignes et styles aux emprises, par coin haut-gauche.
 *
 * Une entrée qui ne correspond à aucun bâtiment est presque toujours une
 * coordonnée mal recopiée après un déplacement sur la carte, et un style
 * inconnu une faute de frappe : on signale les deux plutôt que de laisser une
 * enseigne disparaître ou un bâtiment retomber en silence sur le style défaut.
 */
function attachSpecs(rects: Rect[], specs: Record<string, BuildingSpec> = {}): BuildingRect[] {
  const known = new Set(rects.map((r) => tileKey(r.x, r.y)));
  for (const [key, spec] of Object.entries(specs)) {
    if (!known.has(key)) {
      throw new Error(`Bâtiment déclaré en ${key} : aucune emprise ne commence à cette case`);
    }
    if (spec.style !== undefined && !isBuildingStyle(spec.style)) {
      throw new Error(`Style « ${spec.style} » inconnu pour le bâtiment en ${key}`);
    }
  }

  return rects.map((r) => {
    const spec = specs[tileKey(r.x, r.y)];
    const style = spec?.style;
    return {
      ...r,
      label: spec?.label,
      style: style && isBuildingStyle(style) ? style : DEFAULT_STYLE,
    };
  });
}

export function parseMap(map: GameMap): ParsedMap {
  const height = map.rows.length;
  const width = map.rows[0]?.length ?? 0;

  if (height === 0 || width === 0) throw new Error('Carte vide');
  const ragged = map.rows.findIndex((r) => r.length !== width);
  if (ragged !== -1) {
    throw new Error(`Carte irrégulière : ligne ${ragged} fait ${map.rows[ragged].length} au lieu de ${width}`);
  }

  const kinds: TileKind[][] = [];
  const positions: ParsedMap['positions'] = {
    path: [], plaza: [], tall: [], flower: [], wood: [], door: [],
    wall: [], sign: [], counter: [], trophy: [], water: [], dock: [], sand: [], rock: [], moor: [], cliff: [], props: {},
  };
  const signAt: Record<string, string> = {};
  const npcTiles: Tile[] = [];
  let spawn: Tile | null = null;

  for (let y = 0; y < height; y++) {
    const row: TileKind[] = [];
    for (let x = 0; x < width; x++) {
      const ch = map.rows[y][x];
      let kind: TileKind = 'grass';

      if (ch >= '1' && ch <= '9') kind = 'sign';
      else if (ch === 'P') spawn = { x, y };
      else if (LEGEND[ch]) kind = LEGEND[ch];
      else if (ch !== '.') throw new Error(`Caractère inconnu '${ch}' en (${x},${y})`);

      if (kind === 'prop') (positions.props[ch] ??= []).push({ x, y });
      else if (kind === 'sign') {
        positions.sign.push({ x, y });
        signAt[tileKey(x, y)] = ch;
      } else if (kind === 'npc') npcTiles.push({ x, y });
      else if (kind !== 'grass' && kind !== 'building') positions[kind].push({ x, y });

      row.push(kind);
    }
    kinds.push(row);
  }

  if (!spawn) throw new Error("Aucun spawn 'P' dans la carte");

  const isWalkableKind = (t: Tile) => ON_LAND.has(kinds[t.y][t.x]) || ON_WATER.has(kinds[t.y][t.x]);

  /* Une téléportation posée sur un mur ne se déclencherait jamais, et un 'N'
     sans réplique produirait un personnage muet : deux pannes silencieuses. */
  const warps = map.warps ?? {};
  for (const key of Object.keys(warps)) {
    const [x, y] = key.split(',').map(Number);
    if (x < 0 || y < 0 || x >= width || y >= height) {
      throw new Error(`Téléportation en ${key} : hors de la carte « ${map.name} »`);
    }
    if (!isWalkableKind({ x, y })) {
      throw new Error(`Téléportation en ${key} : la case est un ${kinds[y][x]}, on ne peut pas s'y rendre`);
    }
  }

  const npcs = map.npcs ?? {};
  for (const t of npcTiles) {
    if (!npcs[tileKey(t.x, t.y)]) {
      throw new Error(`Personnage en ${tileKey(t.x, t.y)} sans réplique dans « ${map.name} »`);
    }
  }
  const npcKeys = new Set(npcTiles.map((t) => tileKey(t.x, t.y)));
  for (const key of Object.keys(npcs)) {
    if (!npcKeys.has(key)) {
      throw new Error(`Réplique déclarée en ${key} mais aucun 'N' à cette case dans « ${map.name} »`);
    }
  }

  /* Un piédestal sans donnée est un socle vide, une donnée sans piédestal est
     une expérience que personne ne verra jamais : les deux sont des erreurs. */
  const trophies = map.trophies ?? {};
  for (const t of positions.trophy) {
    if (!trophies[tileKey(t.x, t.y)]) {
      throw new Error(`Piédestal en ${tileKey(t.x, t.y)} sans donnée dans « ${map.name} »`);
    }
  }
  const trophyKeys = new Set(positions.trophy.map((t) => tileKey(t.x, t.y)));
  for (const key of Object.keys(trophies)) {
    if (!trophyKeys.has(key)) {
      throw new Error(`Trophée déclaré en ${key} mais aucun 'X' à cette case dans « ${map.name} »`);
    }
  }

  return {
    name: map.name,
    width,
    height,
    interior: map.interior ?? false,
    interiorStyle: map.interiorStyle ?? 'quests',
    kinds,
    spawn,
    positions,
    buildings: attachSpecs(findRectRegions(map.rows, 'H'), map.buildings),
    signAt,
    warps,
    npcs,
    npcTiles,
    trophies,
    dialogues: map.dialogues,
  };
}

/**
 * Franchissement d'une case, selon le mode de déplacement.
 *
 * Le ponton appartient aux deux mondes : c'est la seule case où l'on peut
 * embarquer et débarquer, donc la seule qui accepte les deux modes.
 */
export function isWalkable(map: ParsedMap, x: number, y: number, travel: Travel = 'foot'): boolean {
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return false;
  const kind = map.kinds[y][x];
  return travel === 'boat' ? ON_WATER.has(kind) : ON_LAND.has(kind);
}

export const isDock = (map: ParsedMap, x: number, y: number): boolean =>
  x >= 0 && y >= 0 && x < map.width && y < map.height && map.kinds[y][x] === 'dock';

export function signDialogueAt(map: ParsedMap, x: number, y: number): string[] | null {
  const ch = map.signAt[tileKey(x, y)];
  return ch ? map.dialogues[ch] ?? null : null;
}

export const npcAt = (map: ParsedMap, x: number, y: number): NpcSpec | null =>
  map.npcs[tileKey(x, y)] ?? null;

export const warpAt = (map: ParsedMap, x: number, y: number): Warp | null =>
  map.warps[tileKey(x, y)] ?? null;

/**
 * Identifiant du piédestal jouxtant une case.
 *
 * Les trophées se consultent en s'approchant, pas en pressant une touche : dans
 * une salle d'exposition, on lit ce devant quoi on se tient.
 */
export function trophyNear(map: ParsedMap, x: number, y: number): string | null {
  for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]] as const) {
    const id = map.trophies[tileKey(x + dx, y + dy)];
    if (id) return id;
  }
  return null;
}
