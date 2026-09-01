/**
 * Tests des assets générés par code.
 *   npm run test:assets
 *
 * Ces assertions couvrent ce que l'œil ne tranche pas de façon fiable sur une
 * planche de contrôle : symétries exactes, opacité complète des tuiles de sol,
 * et le fait que le cycle de marche anime réellement quelque chose.
 */
import assert from 'node:assert/strict';
import { pixelArtSize, rasterFromPixelArt } from './pixel';
import { TILES } from './tiles';
import {
  HERO,
  HERO_ATLAS_H,
  HERO_ATLAS_W,
  HERO_ROW,
  heroAtlas,
  heroShadowRaster,
} from './hero';
import { mirrorX, opaqueCount, rastersEqual, subRaster } from './raster';
import { PALETTE } from './palette';
import { GLYPH_H, GLYPH_W, textRaster, textWidth } from './font';
import { SIGN_H, SIGN_MAX_CHARS, SIGN_W, postSignRaster, signRaster } from './sign';
import { BUILDING_STYLES, roofArt, wallArt, type BuildingStyle } from './buildings';

let passed = 0;
function check(label: string, fn: () => void) {
  fn();
  passed++;
  console.log(`  ok  ${label}`);
}

const atlas = heroAtlas();
const frame = (row: number, col: number) =>
  subRaster(atlas, col * HERO.frameW, row * HERO.frameH, HERO.frameW, HERO.frameH);

console.log('\nDSL pixel art');

check('une grille irreguliere est rejetee', () => {
  assert.throws(() => pixelArtSize({ palette: {}, pixels: ['aaa', 'aa'] }), /irr/i);
});

check('un caractere hors palette est rejete', () => {
  assert.throws(() => rasterFromPixelArt({ palette: { a: '#fff' }, pixels: ['ab'] }), /palette/i);
});

check("l'espace est transparent sans etre declare", () => {
  const r = rasterFromPixelArt({ palette: { a: '#ffffff' }, pixels: ['a '] });
  assert.equal(r.data[3], 255);
  assert.equal(r.data[7], 0);
});

check('les couleurs avec alpha sont comprises', () => {
  const r = rasterFromPixelArt({ palette: { a: '#11223344' }, pixels: ['a'] });
  assert.deepEqual(Array.from(r.data), [0x11, 0x22, 0x33, 0x44]);
});

console.log('\ntuiles');

check('toutes les tuiles font 16x16', () => {
  // Pas de nombre attendu : compter les tuiles n'apprend rien, alors qu'une
  // tuile hors format casse l'alignement de toute la grille.
  assert.ok(Object.keys(TILES).length > 0, 'aucune tuile enregistrée');
  for (const [name, art] of Object.entries(TILES)) {
    const { width, height } = pixelArtSize(art);
    assert.equal(width, 16, `${name} largeur`);
    assert.equal(height, 16, `${name} hauteur`);
  }
});

check('aucune tuile ne comporte de trou', () => {
  // Un pixel transparent dans une tuile de sol laisse voir le vide à l'écran.
  for (const [name, art] of Object.entries(TILES)) {
    const r = rasterFromPixelArt(art);
    assert.equal(opaqueCount(r), 16 * 16, `${name} a des pixels transparents`);
  }
});

check('les tuiles ne tirent que des couleurs de la palette', () => {
  const allowed = new Set<string>(Object.values(PALETTE));
  for (const [name, art] of Object.entries(TILES)) {
    for (const hex of Object.values(art.palette)) {
      assert.ok(allowed.has(hex), `${name} utilise ${hex}, absent de PALETTE`);
    }
  }
});

console.log('\natlas du heros');

check("l'atlas fait exactement 4 orientations x 4 frames", () => {
  // Dimensions déduites du format, pas codées en dur : redimensionner le sprite
  // ne doit pas casser un test qui n'a rien à dire sur la taille choisie.
  assert.equal(HERO_ATLAS_W, HERO.frameW * HERO.cols);
  assert.equal(HERO_ATLAS_H, HERO.frameH * HERO.rows);
  assert.equal(atlas.width, HERO_ATLAS_W);
  assert.equal(atlas.height, HERO_ATLAS_H);
});

check('le sprite tient dans une tuile en largeur', () => {
  // Un sprite plus large qu'une case déborderait sur les cases voisines et
  // rendrait les collisions visuellement fausses.
  assert.ok(HERO.frameW <= 16, `frame de ${HERO.frameW} texels de large`);
  assert.ok(HERO.frameH <= 20, `frame de ${HERO.frameH} texels de haut : trop grand pour l'echelle visee`);
});

check('aucune frame vide', () => {
  for (let row = 0; row < HERO.rows; row++) {
    for (let col = 0; col < HERO.cols; col++) {
      assert.ok(opaqueCount(frame(row, col)) > 60, `frame ${row},${col} quasi vide`);
    }
  }
});

check('gauche est exactement le miroir de droite', () => {
  for (let col = 0; col < HERO.cols; col++) {
    const left = frame(HERO_ROW.left, col);
    const right = frame(HERO_ROW.right, col);
    assert.ok(rastersEqual(left, mirrorX(right)), `frame ${col} : miroir incorrect`);
  }
});

check('le profil est asymetrique, sinon la direction est illisible', () => {
  // Si la vue de profil était symétrique, gauche et droite seraient identiques
  // et le joueur ne saurait jamais où il regarde.
  for (let col = 0; col < HERO.cols; col++) {
    const right = frame(HERO_ROW.right, col);
    assert.ok(!rastersEqual(right, mirrorX(right)), `frame ${col} : profil symétrique`);
  }
});

check('les quatre orientations sont distinctes', () => {
  const rows = [HERO_ROW.down, HERO_ROW.left, HERO_ROW.right, HERO_ROW.up];
  for (let a = 0; a < rows.length; a++) {
    for (let b = a + 1; b < rows.length; b++) {
      assert.ok(
        !rastersEqual(frame(rows[a], 0), frame(rows[b], 0)),
        `orientations ${rows[a]} et ${rows[b]} identiques`,
      );
    }
  }
});

check('le cycle de marche anime reellement les jambes', () => {
  for (const row of Object.values(HERO_ROW)) {
    const idle = frame(row, 0);
    assert.ok(!rastersEqual(idle, frame(row, 1)), `ligne ${row} : frame 1 identique au repos`);
    assert.ok(!rastersEqual(idle, frame(row, 3)), `ligne ${row} : frame 3 identique au repos`);
    // Les deux frames de repos du cycle doivent bien être identiques.
    assert.ok(rastersEqual(idle, frame(row, 2)), `ligne ${row} : frame 2 devrait être le repos`);
    // Pas gauche et pas droit doivent différer l'un de l'autre.
    assert.ok(!rastersEqual(frame(row, 1), frame(row, 3)), `ligne ${row} : les deux pas sont identiques`);
  }
});

check("l'ombre au sol est un masque elliptique", () => {
  /* L'ombre ne porte plus sa couleur : c'est un masque de forme, teinté par le
     matériau. On vérifie donc la forme, pas la teinte — et surtout que les
     coins sont vides, sinon l'ombre serait un rectangle. */
  const shadow = heroShadowRaster();
  assert.ok(shadow.width <= HERO.frameW, "l'ombre déborde de la largeur du sprite");

  const alphaAt = (x: number, y: number) => shadow.data[(y * shadow.width + x) * 4 + 3];
  assert.equal(alphaAt(0, 0), 0, 'coin haut-gauche opaque');
  assert.equal(alphaAt(shadow.width - 1, 0), 0, 'coin haut-droit opaque');
  assert.equal(alphaAt(0, shadow.height - 1), 0, 'coin bas-gauche opaque');
  assert.equal(
    alphaAt(Math.floor(shadow.width / 2), Math.floor(shadow.height / 2)),
    255,
    'centre transparent : la forme est vide',
  );
});

console.log('\npolice et enseignes');

check('la largeur annoncee correspond au rendu', () => {
  for (const text of ['A', 'LAB', 'QUESTS', 'STACKDEX']) {
    assert.equal(textRaster(text, '#ffffff').width, textWidth(text), text);
  }
});

check('un caractere absent de la police est signale', () => {
  // Une enseigne muette passerait inaperçue : mieux vaut échouer au chargement.
  assert.throws(() => textRaster('café', '#ffffff'), /police/i);
});

check('chaque glyphe rendu fait bien 3x5', () => {
  const r = textRaster('W', '#ffffff');
  assert.equal(r.width, GLYPH_W);
  assert.equal(r.height, GLYPH_H);
  assert.ok(opaqueCount(r) > 0, 'glyphe vide');
});

check('la casse est indifferente', () => {
  const upper = textRaster('LAB', '#ffffff');
  const lower = textRaster('lab', '#ffffff');
  assert.ok(rastersEqual(upper, lower));
});

check('une enseigne fait 32x8 et reste opaque', () => {
  const r = signRaster('QUESTS');
  assert.equal(r.width, SIGN_W);
  assert.equal(r.height, SIGN_H);
  assert.equal(opaqueCount(r), SIGN_W * SIGN_H, 'trous dans le fond de l enseigne');
});

check('le texte est reellement grave sur l enseigne', () => {
  const blank = signRaster(' ');
  const filled = signRaster('LAB');
  assert.ok(!rastersEqual(blank, filled), 'enseigne identique a une enseigne vide');
});

check('une enseigne trop longue est refusee', () => {
  assert.throws(() => signRaster('X'.repeat(SIGN_MAX_CHARS + 1)), /trop longue/i);
  assert.doesNotThrow(() => signRaster('X'.repeat(SIGN_MAX_CHARS)));
});

console.log('\nstyles de batiment');

check('chaque style produit un toit et un crepi valides', () => {
  const styles = Object.entries(BUILDING_STYLES) as [string, BuildingStyle][];
  assert.ok(styles.length >= 3, 'trop peu de styles pour un bourg varié');
  for (const [name, style] of styles) {
    for (const [what, art] of [['toit', roofArt(style)], ['crépi', wallArt(style)]] as const) {
      const { width, height } = pixelArtSize(art);
      assert.equal(width, 16, `${name} ${what} largeur`);
      assert.equal(height, 16, `${name} ${what} hauteur`);
      assert.equal(opaqueCount(rasterFromPixelArt(art)), 256, `${name} ${what} : pixels transparents`);
    }
  }
});

check('les styles ne tirent que des couleurs de la palette', () => {
  const allowed = new Set<string>(Object.values(PALETTE));
  for (const [name, style] of Object.entries(BUILDING_STYLES)) {
    const used = [
      ...Object.values(style.roof), ...Object.values(style.wall), style.trim, style.trimDark,
    ];
    for (const hex of used) assert.ok(allowed.has(hex), `${name} utilise ${hex}, absent de PALETTE`);
  }
});

check('les styles sont visuellement distincts', () => {
  // Deux bâtiments au toit identique ne se distinguent pas de loin : c'est le
  // premier signe qu'un décor est généré plutôt que composé.
  const roofs = Object.values(BUILDING_STYLES).map((s) => s.roof.base);
  assert.equal(new Set(roofs).size, roofs.length, 'deux styles partagent la même toiture');
});

check('un panneau de bord de route tranche avec l herbe', () => {
  /* Ce qui rend un panneau repérable n'est pas sa clarté seule — une planche
     crème n'est qu'à peine plus lumineuse que l'herbe éclairée. C'est
     l'encadrement sombre qui l'entoure : planche au-dessus de l'herbe, cadre
     nettement en dessous. C'est ce sandwich qu'on vérifie ici, et c'est
     exactement ce qui manquait à la version verte du panneau. */
  const board = postSignRaster();
  const lum = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const at = (x: number, y: number) => {
    const i = (y * board.width + x) * 4;
    return lum(board.data[i], board.data[i + 1], board.data[i + 2]);
  };
  const hexLum = (hex: string) => {
    const n = parseInt(hex.slice(1), 16);
    return lum((n >> 16) & 255, (n >> 8) & 255, n & 255);
  };

  const grass = hexLum(PALETTE.grass);
  const plank = at(1, 1); // fond de planche, hors traits d'écriture
  const frame = at(0, 0); // cadre

  assert.ok(plank > grass + 40, `planche ${plank.toFixed(0)} trop proche de l'herbe ${grass.toFixed(0)}`);
  assert.ok(frame < grass - 40, `cadre ${frame.toFixed(0)} trop proche de l'herbe ${grass.toFixed(0)}`);
});

console.log(`\n${passed} assertions passees\n`);
