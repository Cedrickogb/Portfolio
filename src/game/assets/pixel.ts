import { createRaster, parseColor, setPixel, type Raster } from './raster';

/**
 * Le pixel art s'écrit comme de l'ASCII art : une palette locale associant un
 * caractère à une couleur, puis la grille elle-même. Lisible, éditable à la
 * main, et *diffable* dans git — changer une couleur est un changement d'une
 * ligne, pas un aller-retour dans un éditeur d'image.
 *
 * L'espace est toujours transparent.
 */
export interface PixelArt {
  palette: Record<string, string>;
  pixels: string[];
}

export interface Size {
  width: number;
  height: number;
}

/** Valide la grille et renvoie ses dimensions. Lève sur grille irrégulière. */
export function pixelArtSize(art: PixelArt): Size {
  const height = art.pixels.length;
  if (height === 0) throw new Error('Grille vide');
  const width = art.pixels[0].length;
  if (width === 0) throw new Error('Première ligne vide');

  const ragged = art.pixels.findIndex((row) => row.length !== width);
  if (ragged !== -1) {
    throw new Error(
      `Grille irrégulière : ligne ${ragged} fait ${art.pixels[ragged].length} caractères au lieu de ${width}`,
    );
  }
  return { width, height };
}

export function rasterFromPixelArt(art: PixelArt): Raster {
  const { width, height } = pixelArtSize(art);
  const out = createRaster(width, height);

  // La palette est résolue une fois pour toutes, pas par pixel.
  const resolved = new Map<string, ReturnType<typeof parseColor>>();
  resolved.set(' ', [0, 0, 0, 0]);
  for (const [ch, color] of Object.entries(art.palette)) {
    resolved.set(ch, parseColor(color));
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const ch = art.pixels[y][x];
      const rgba = resolved.get(ch);
      if (!rgba) {
        throw new Error(`Caractère '${ch}' en (${x},${y}) absent de la palette`);
      }
      if (rgba[3] !== 0) setPixel(out, x, y, rgba);
    }
  }
  return out;
}
