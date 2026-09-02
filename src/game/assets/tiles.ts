import { PALETTE } from './palette';
import type { PixelArt } from './pixel';

/**
 * Jeu de tuiles 16x16, généré par règles puis figé en littéraux : chaque grille
 * reste éditable à la main et *diffable* dans git.
 *
 * `pixelArtSize` lève une erreur explicite au moindre décalage de ligne, et
 * `assets.test.ts` vérifie qu'aucune tuile ne comporte de trou et qu'elles ne
 * tirent que des couleurs de PALETTE.
 */

export const grass: PixelArt = {
  palette: { 'a': PALETTE.grass, 'b': PALETTE.grassLight, 'c': PALETTE.grassDark, 'd': PALETTE.grassHi },
  pixels: [
    'aaaaaaaaaaaaaaaa',
    'aaaaaaadaaaaaaaa',
    'aaaacaaaaaaaaaaa',
    'aaacbcaaaaaaaaaa',
    'aacaacaaaaaacaaa',
    'aaaaaaaaaaacbcaa',
    'aaaadaaaaacaacaa',
    'aaaaaaaaaaaaaada',
    'aaaaaaaaaaaaaaaa',
    'aaaaaaaacaaaaaaa',
    'aaaaaaacbcaaaaaa',
    'aaaaaacaacaaaaac',
    'caaaaaaaaaaaaacb',
    'caacaaaaaaaaacaa',
    'aacbcaaaaaadaaaa',
    'acaacaaaaaaaaaaa',
  ],
};

export const grassFlower: PixelArt = {
  palette: { 'a': PALETTE.grass, 'b': PALETTE.grassLight, 'c': PALETTE.grassDark, 'r': PALETTE.flowerRed, 'h': PALETTE.flowerHi },
  pixels: [
    'aaaaaaaaaaaaaaaa',
    'aaaaaaaaaaaaaaaa',
    'aaaacaaaaaraaaaa',
    'aaacbcaaarhraaaa',
    'aacaacaaaaracaaa',
    'aaaaraaaaaacbcaa',
    'aaarhraaaacaacaa',
    'aaaaraaaaaaaaaaa',
    'aaaaaaaaaaaaaraa',
    'aaaaaaaacaaarhra',
    'aaaaaaacbcaaaraa',
    'aaaaaacaacaaaaac',
    'caaaaaraaaaaaacb',
    'caaaarhraaaaacaa',
    'aaaaaaraaaaaaaaa',
    'aaaaaaaaaaaaaaaa',
  ],
};

export const tallGrass: PixelArt = {
  palette: { 'T': PALETTE.tallGrass, 't': PALETTE.grassDark },
  pixels: [
    'TTTTTtTTTTTTTTTT',
    'TtTTTTTTTTTTTtTT',
    'TTTTTTTTTtTTTTTT',
    'TTTTTTTTTTTTtTTT',
    'TTTTTTTTTTTTTTTT',
    'TTTTTTTtTTTTTTTT',
    'TTTtTTTTTTTTTTTt',
    'TTTTTTTTTTTtTTTT',
    'TTTTTTTTTTTTTTTT',
    'TTTTTTTTTTTTTTTT',
    'TTtTTTTTTTtTTTTT',
    'TTTTTTtTTTTTTTTT',
    'TTTTTTTTTTTTTTtT',
    'TTTTTTTTtTTTTTTT',
    'TTTTtTTTTTTTTTTT',
    'TTTTTTTTTTTTTTTT',
  ],
};

export const plaza: PixelArt = {
  palette: { 's': PALETTE.stoneLight, 'S': PALETTE.stoneHi, 'j': PALETTE.stone },
  pixels: [
    'Sssssssjsssssssj',
    'ssssSssjsssssssj',
    'sssssssjSssssssj',
    'sssssssjssssSssj',
    'sssssssjsssssssj',
    'sssssssjsssssssj',
    'sSsssssjsssssssj',
    'jjjjjjjjjjjjjjjj',
    'sssjsssssSsjssss',
    'sssjsssssssjsSss',
    'sssjsssssssjssss',
    'sssjsssssssjssss',
    'ssSjsssssssjssss',
    'sssjssSssssjssss',
    'sssjssssssSjssss',
    'jjjjjjjjjjjjjjjj',
  ],
};

export const path: PixelArt = {
  palette: { 'p': PALETTE.dirt, 'q': PALETTE.dirtLight, 'r': PALETTE.dirtDark },
  pixels: [
    'qppppppppppppqpp',
    'ppppqppppppppppp',
    'ppppppppqppppppp',
    'ppppppppppppqppp',
    'pppqpppppppppppp',
    'ppprpppqpppppppp',
    'ppppppprpppqpppp',
    'ppqpppppppprpppq',
    'ppppppqppppppppr',
    'pprpppppppqppppp',
    'pqpppprpppppppqp',
    'pppppqpppprppppp',
    'pppppppppqpppprp',
    'qrpppppppppppqpp',
    'ppppqrpppppppppp',
    'ppppppppqrpppppp',
  ],
};

export const woodFloor: PixelArt = {
  palette: { 'w': PALETTE.wood, 'g': PALETTE.woodLight, 's': PALETTE.woodDark },
  pixels: [
    'sgggggggswwwwwww',
    'swwwwwwwswwwwwww',
    'swwwwwwwswwwwwww',
    'swwwwwwwsggggggg',
    'swwwwwwwswwwwwww',
    'sgggggggswwwwwww',
    'swwwwwwwswwwwwww',
    'swwwwwwwswwwwwww',
    'swwwwwwwsggggggg',
    'swwwwwwwswwwwwww',
    'sgggggggswwwwwww',
    'swwwwwwwswwwwwww',
    'swwwwwwwswwwwwww',
    'swwwwwwwsggggggg',
    'swwwwwwwswwwwwww',
    'sgggggggswwwwwww',
  ],
};

export const wallpaper: PixelArt = {
  palette: { 'c': PALETTE.trim, 'd': PALETTE.trimDark, 'C': PALETTE.wallHi, 'w': PALETTE.wall },
  pixels: [
    'dcccccdcccccdccc',
    'cccccdcccccdcccc',
    'ccccdcccccdccccc',
    'cccdcccccdcccccd',
    'ccdcccccdcccccdc',
    'cdcccccdcccccdcc',
    'CCCCCCCCCCCCCCCC',
    'wwwwwwCwwwwwwwww',
    'wwCwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwC',
    'wwwwwwwwwwwCwwww',
    'wwwwwwwCwwwwwwww',
    'wwwCwwwwwwwwwwww',
    'wwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwCwww',
    'wwwwwwwwCwwwwwww',
  ],
};

export const water: PixelArt = {
  palette: { 'w': PALETTE.water, 'W': PALETTE.waterHi, 'c': PALETTE.waterDeep },
  pixels: [
    'cwwwwwwwcwwwwwww',
    'cwwwwwwwcwwwwwww',
    'wwwwwcwwwwwWwcww',
    'wwwwwcwwwwwwwcww',
    'wwcwwwwwwwcwwwww',
    'wwcwwwwwwwcwwwww',
    'wwwwwwwcwwWwwwwc',
    'wwwwWwwcwwwwwwwc',
    'wwwwcwwwwwwwcwww',
    'wwwwcwwwwwwwcwwW',
    'wcwwwwwwwcwwwwww',
    'wcwWwwwwwcwwwwww',
    'wwwwwwcwwwwwwwcw',
    'wwwwwwcwwwwwwwcw',
    'wwwcwwwwWwwcwwww',
    'wwWcwwwwwwwcwwww',
  ],
};

export const dock: PixelArt = {
  palette: { 'p': PALETTE.wood, 'g': PALETTE.woodDark, 's': PALETTE.woodLight },
  pixels: [
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'ssssssssssssssss',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'ssssssssssssssss',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
    'gpppppppgppppppp',
  ],
};

export const sand: PixelArt = {
  palette: { 's': PALETTE.sand, 'h': PALETTE.sandHi, 'd': PALETTE.sandDark },
  pixels: [
    'hsssssssssssssss',
    'sshsssdsssssssss',
    'sssshsssssssdsss',
    'sssssshsssssssss',
    'sssssssshsssssss',
    'sdsssssssshsssss',
    'sssssssdsssshsss',
    'sssssssssssssdhs',
    'ssssssssssssssss',
    'ssssssssssssssss',
    'shdsssssssssssss',
    'ssshssssdsssssss',
    'ssssshssssssssds',
    'ssssssshssssssss',
    'ssssssssshssssss',
    'sssdssssssshssss',
  ],
};

export const rock: PixelArt = {
  palette: { 'r': PALETTE.rock, 'h': PALETTE.rockHi, 'd': PALETTE.rockDark },
  pixels: [
    'drrrrrrrrdrdrrrr',
    'rrrrrrddrrrrrhrr',
    'rdrrrdrrrhrrdrdr',
    'rrrdrhrdrrrrdrrr',
    'rddrrrrrrrdrrdrr',
    'rrrrrrrrdrrrrrhr',
    'rrrdrrdrrrhrrrdd',
    'rrrrdrhrrdrrrdrr',
    'rrdrdrrrrrrdrrrd',
    'drrrrrrrrddrrrrh',
    'rrrrrdrdrrrhrrrr',
    'drrrrdrhrrrdrrdr',
    'rrrdrrdrrrrrdrrr',
    'rdrrrrrrrrdrdrrr',
    'rrrrrrrddrrrhrrr',
    'rrdrrrdrhrrrrdrd',
  ],
};

export const moor: PixelArt = {
  palette: { 'm': PALETTE.moor, 'h': PALETTE.moorHi, 'd': PALETTE.moorDark },
  pixels: [
    'dmmmmmmmmmmhmdmm',
    'mmdmmmhmmmmmmmmd',
    'mhmmdmmmmmmmhmmm',
    'mmmmmmdhmmmmmmmm',
    'mmhmmmmmdmmmmhmm',
    'mmmmmmmmhmdmmmmm',
    'mmmhmmmmmmmmdmhm',
    'mdmmmmmmmhmmmmdm',
    'mmmdhmmmmmmmmmmh',
    'mmmmmdmmmmhmmmmm',
    'mmmmmhmdmmmmmmmm',
    'hmmmmmmmmdmhmmmm',
    'mmmmmmhmmmmdmmmm',
    'dhmmmmmmmmmmhdmm',
    'mmdmmmmhmmmmmmmd',
    'mmhmdmmmmmmmmhmm',
  ],
};

export const TILES = {
  grass,
  grassFlower,
  tallGrass,
  plaza,
  path,
  woodFloor,
  wallpaper,
  water,
  dock,
  sand,
  rock,
  moor,
} as const;

export type TileName = keyof typeof TILES;
