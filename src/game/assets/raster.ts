/**
 * Rasteriseur minimal en RGBA, volontairement sans aucune dépendance au DOM ni
 * à three.js. C'est ce qui permet de générer et de *prévisualiser* les assets
 * hors navigateur (`npm run assets:preview`) et de les tester.
 */
export interface Raster {
  width: number;
  height: number;
  /** RGBA non prémultiplié, 4 octets par pixel, ligne par ligne. */
  data: Uint8ClampedArray;
}

export type RGBA = readonly [number, number, number, number];

const HEX3 = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
const HEX6 = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const HEX8 = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

export function parseColor(color: string): RGBA {
  if (color === 'transparent') return [0, 0, 0, 0];

  const short = HEX3.exec(color);
  if (short) {
    const [, r, g, b] = short;
    return [parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 255];
  }

  const withAlpha = HEX8.exec(color);
  if (withAlpha) {
    const [, r, g, b, a] = withAlpha;
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16)];
  }

  const long = HEX6.exec(color);
  if (long) {
    const [, r, g, b] = long;
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 255];
  }

  throw new Error(`Couleur non reconnue : ${color} (attendu #rgb, #rrggbb, #rrggbbaa ou transparent)`);
}

export function createRaster(width: number, height: number): Raster {
  if (width <= 0 || height <= 0) throw new Error(`Dimensions invalides : ${width}x${height}`);
  return { width, height, data: new Uint8ClampedArray(width * height * 4) };
}

export function setPixel(r: Raster, x: number, y: number, rgba: RGBA): void {
  if (x < 0 || y < 0 || x >= r.width || y >= r.height) return;
  const i = (y * r.width + x) * 4;
  r.data[i] = rgba[0];
  r.data[i + 1] = rgba[1];
  r.data[i + 2] = rgba[2];
  r.data[i + 3] = rgba[3];
}

export function fillRect(
  r: Raster,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string | RGBA,
): void {
  const rgba = typeof color === 'string' ? parseColor(color) : color;
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) setPixel(r, x + dx, y + dy, rgba);
  }
}

/** Recopie `src` dans `dst`, en ignorant les pixels totalement transparents. */
export function blit(dst: Raster, src: Raster, ox: number, oy: number): void {
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const i = (y * src.width + x) * 4;
      if (src.data[i + 3] === 0) continue;
      setPixel(dst, ox + x, oy + y, [
        src.data[i],
        src.data[i + 1],
        src.data[i + 2],
        src.data[i + 3],
      ]);
    }
  }
}

/** Miroir horizontal : une seule vue de profil suffit pour gauche *et* droite. */
export function mirrorX(src: Raster): Raster {
  const out = createRaster(src.width, src.height);
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const i = (y * src.width + x) * 4;
      const j = (y * src.width + (src.width - 1 - x)) * 4;
      out.data[j] = src.data[i];
      out.data[j + 1] = src.data[i + 1];
      out.data[j + 2] = src.data[i + 2];
      out.data[j + 3] = src.data[i + 3];
    }
  }
  return out;
}

/** Agrandissement entier en nearest neighbor, pour les planches de contrôle. */
export function scaleRaster(src: Raster, factor: number): Raster {
  const out = createRaster(src.width * factor, src.height * factor);
  for (let y = 0; y < out.height; y++) {
    for (let x = 0; x < out.width; x++) {
      const i = (Math.floor(y / factor) * src.width + Math.floor(x / factor)) * 4;
      const j = (y * out.width + x) * 4;
      out.data[j] = src.data[i];
      out.data[j + 1] = src.data[i + 1];
      out.data[j + 2] = src.data[i + 2];
      out.data[j + 3] = src.data[i + 3];
    }
  }
  return out;
}

/** Extrait une sous-image. Sert notamment à isoler une frame d'un atlas. */
export function subRaster(src: Raster, x: number, y: number, w: number, h: number): Raster {
  if (x < 0 || y < 0 || x + w > src.width || y + h > src.height) {
    throw new Error(`Sous-image (${x},${y},${w},${h}) hors des limites ${src.width}x${src.height}`);
  }
  const out = createRaster(w, h);
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      const i = ((y + dy) * src.width + (x + dx)) * 4;
      const j = (dy * w + dx) * 4;
      out.data[j] = src.data[i];
      out.data[j + 1] = src.data[i + 1];
      out.data[j + 2] = src.data[i + 2];
      out.data[j + 3] = src.data[i + 3];
    }
  }
  return out;
}

export function rastersEqual(a: Raster, b: Raster): boolean {
  if (a.width !== b.width || a.height !== b.height) return false;
  for (let i = 0; i < a.data.length; i++) if (a.data[i] !== b.data[i]) return false;
  return true;
}

/** Nombre de pixels non totalement transparents. */
export function opaqueCount(r: Raster): number {
  let n = 0;
  for (let i = 3; i < r.data.length; i += 4) if (r.data[i] !== 0) n++;
  return n;
}

/**
 * Cerne la silhouette d'un pixel art : tout pixel transparent touchant un pixel
 * opaque prend la couleur du contour. C'est ce qui rend un sprite lisible
 * par-dessus n'importe quel fond, clair ou sombre — sans ça, un personnage aux
 * teintes moyennes se noie dans l'herbe.
 *
 * Le sprite doit conserver 1 px de marge sur ses quatre bords, sinon le contour
 * est rogné.
 */
export function outline(src: Raster, color: string): Raster {
  const rgba = parseColor(color);
  const out = createRaster(src.width, src.height);
  out.data.set(src.data);

  const opaqueAt = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= src.width || y >= src.height) return false;
    return src.data[(y * src.width + x) * 4 + 3] !== 0;
  };

  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      if (opaqueAt(x, y)) continue;
      const touches =
        opaqueAt(x - 1, y) || opaqueAt(x + 1, y) || opaqueAt(x, y - 1) || opaqueAt(x, y + 1);
      if (touches) setPixel(out, x, y, rgba);
    }
  }
  return out;
}

/**
 * Ellipse pleine, en pixels francs. Sert aux ombres portées des décors
 * organiques (personnage, arbres, massifs), où un rectangle jurerait.
 *
 * Générée plutôt que dessinée à la main : la taille de l'ombre suit celle du
 * décor, et une ellipse écrite en dur serait à refaire à chaque ajustement.
 */
export function ellipseRaster(width: number, height: number, color: string): Raster {
  const out = createRaster(width, height);
  const rgba = parseColor(color);
  const rx = width / 2;
  const ry = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = (x + 0.5 - rx) / rx;
      const ny = (y + 0.5 - ry) / ry;
      if (nx * nx + ny * ny <= 1) setPixel(out, x, y, rgba);
    }
  }
  return out;
}
