export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Tile {
  x: number;
  y: number;
}

/** L'écran regarde vers -z : « haut » correspond donc à y décroissant. */
export const DIR_DELTA: Record<Direction, Tile> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const tileAhead = (tile: Tile, facing: Direction): Tile => ({
  x: tile.x + DIR_DELTA[facing].x,
  y: tile.y + DIR_DELTA[facing].y,
});
