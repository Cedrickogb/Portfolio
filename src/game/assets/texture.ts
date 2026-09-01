import { CanvasTexture, NearestFilter, RepeatWrapping, SRGBColorSpace } from 'three';
import type { Raster } from './raster';

/**
 * Pont entre le rasteriseur pur et three.js. Volontairement isolé ici : tout le
 * reste du dossier `assets` reste exécutable hors navigateur.
 *
 * `NearestFilter` des deux côtés et pas de mipmaps : c'est non négociable pour
 * du pixel art, le moindre filtrage linéaire transforme les arêtes en bouillie.
 */
export function textureFromRaster(
  raster: Raster,
  options: { repeat?: [number, number] } = {},
): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = raster.width;
  canvas.height = raster.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Contexte 2D indisponible : impossible de générer la texture');
  ctx.putImageData(new ImageData(new Uint8ClampedArray(raster.data), raster.width, raster.height), 0, 0);

  const texture = new CanvasTexture(canvas);
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.colorSpace = SRGBColorSpace;

  if (options.repeat) {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(options.repeat[0], options.repeat[1]);
  }
  return texture;
}
