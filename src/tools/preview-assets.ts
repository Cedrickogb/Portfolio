import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { PALETTE } from '../game/assets/palette';
import { rasterFromPixelArt } from '../game/assets/pixel';
import { TILES } from '../game/assets/tiles';
import { heroAtlas, heroShadowRaster } from '../game/assets/hero';
import { blit, createRaster, fillRect, scaleRaster, type Raster } from '../game/assets/raster';
import { postSignRaster, signRaster } from '../game/assets/sign';
import { BUILDING_STYLES, roofArt, wallArt } from '../game/assets/buildings';
import { encodePng } from './png';

/**
 * Planche de contrôle des assets générés par code.
 *   npm run assets:preview
 *
 * Écrit un PNG regroupant palette, tuiles et atlas du héros, agrandis en
 * nearest neighbor. Sans ça, on écrit du pixel art sans jamais le voir.
 */

const ZOOM = 4;
const GAP = 8;
const OUT = '.test-out/assets-preview.png';

const tiles = Object.entries(TILES).map(([name, art]) => ({
  name,
  raster: scaleRaster(rasterFromPixelArt(art), ZOOM),
}));
const hero = scaleRaster(heroAtlas(), ZOOM);
const heroBike = scaleRaster(heroAtlas(undefined, 'bike'), ZOOM);
const heroBoat = scaleRaster(heroAtlas(undefined, 'boat'), ZOOM);
const shadow = scaleRaster(heroShadowRaster(), ZOOM);
const signs = ['LAB', 'QUESTS', 'STACKS', 'CONTACT'].map((l) => scaleRaster(signRaster(l), ZOOM));
const postSign = scaleRaster(postSignRaster(), ZOOM);
const styles = Object.entries(BUILDING_STYLES).map(([name, style]) => ({
  name,
  roof: scaleRaster(rasterFromPixelArt(roofArt(style)), ZOOM),
  wall: scaleRaster(rasterFromPixelArt(wallArt(style)), ZOOM),
}));

const swatch = 24;
const perRow = 12;
const colors = Object.entries(PALETTE);
const swatchRows = Math.ceil(colors.length / perRow);

const tilesRowW = tiles.length * tiles[0].raster.width + (tiles.length - 1) * GAP;
const stylesRowW = styles.length * (16 * ZOOM * 2 + GAP + 2);
const width = Math.max(tilesRowW, hero.width, signs[0].width, stylesRowW, perRow * swatch) + GAP * 2;
const signsH = signs.length * (signs[0].height + GAP);
const stylesH = styles[0].roof.height + GAP;
const height =
  GAP + swatchRows * swatch + GAP + tiles[0].raster.height + GAP + hero.height * 3 + GAP * 2 + GAP +
  shadow.height + GAP + signsH + stylesH;

const sheet: Raster = createRaster(width, height);
// Fond volontairement magenta : n'importe quel trou dans un asset saute aux yeux.
fillRect(sheet, 0, 0, width, height, '#ff00ff');

let y = GAP;

colors.forEach(([, hex], i) => {
  const cx = GAP + (i % perRow) * swatch;
  const cy = y + Math.floor(i / perRow) * swatch;
  fillRect(sheet, cx, cy, swatch - 2, swatch - 2, hex);
});
y += swatchRows * swatch + GAP;

let x = GAP;
for (const t of tiles) {
  blit(sheet, t.raster, x, y);
  x += t.raster.width + GAP;
}
y += tiles[0].raster.height + GAP;

blit(sheet, hero, GAP, y);
y += hero.height + GAP;
blit(sheet, heroBike, GAP, y);
y += heroBike.height + GAP;
blit(sheet, heroBoat, GAP, y);
y += heroBoat.height + GAP;

blit(sheet, shadow, GAP, y);
y += shadow.height + GAP;

for (const sign of signs) {
  blit(sheet, sign, GAP, y);
  y += sign.height + GAP;
}

blit(sheet, postSign, GAP + signs[0].width + GAP, y - signs.length * (signs[0].height + GAP));

// Une colonne par style : toiture au-dessus, crépi en dessous.
let sx = GAP;
for (const style of styles) {
  blit(sheet, style.roof, sx, y);
  blit(sheet, style.wall, sx + style.roof.width + 2, y);
  sx += style.roof.width * 2 + GAP + 2;
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, encodePng(sheet.width, sheet.height, sheet.data));

console.log(`planche écrite : ${OUT}  (${sheet.width}x${sheet.height})`);
console.log(`  palette   ${colors.length} couleurs`);
console.log(`  tuiles    ${tiles.map((t) => t.name).join(', ')}`);
console.log(`  héros     atlas ${hero.width / ZOOM}x${hero.height / ZOOM} px, zoom x${ZOOM}`);
console.log(`  enseignes ${signs.length}, police 3x5`);
console.log(`  styles    ${styles.map((s) => s.name).join(', ')}`);
