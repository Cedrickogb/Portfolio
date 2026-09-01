/**
 * Tests de la relecture de sauvegarde.
 *   npm run test:save
 *
 * C'est la seule donnée du jeu qui vienne de l'extérieur : elle survit aux
 * refactors, aux changements de carte et à une console ouverte. Tout ce qui
 * n'est pas explicitement validé finira un jour par arriver.
 */
import assert from 'node:assert/strict';
import { SAVE_VERSION, parseSave } from './save';

let passed = 0;
function check(label: string, fn: () => void) {
  fn();
  passed++;
  console.log(`  ok  ${label}`);
}

const known = (id: string) => id === 'town';
const valid = {
  version: SAVE_VERSION,
  mapId: 'town',
  tile: { x: 3, y: 4 },
  facing: 'left',
  questsSeen: ['a'],
  techsSeen: [],
  muted: true,
  savedAt: 1,
};

console.log('\nrelecture de sauvegarde');

check('une sauvegarde valide est relue', () => {
  const s = parseSave(JSON.stringify(valid), known);
  assert.ok(s);
  assert.equal(s.mapId, 'town');
  assert.deepEqual(s.tile, { x: 3, y: 4 });
  assert.equal(s.facing, 'left');
  assert.equal(s.muted, true);
});

check('absence de sauvegarde renvoie null', () => {
  assert.equal(parseSave(null, known), null);
  assert.equal(parseSave('', known), null);
});

check('du JSON invalide ne fait pas tomber le jeu', () => {
  assert.equal(parseSave('{ pas du json', known), null);
});

check('une version anterieure est ignoree', () => {
  assert.equal(parseSave(JSON.stringify({ ...valid, version: SAVE_VERSION - 1 }), known), null);
});

check('une carte inconnue est refusee', () => {
  // Cas reel : une carte renommee ou retiree entre deux visites.
  assert.equal(parseSave(JSON.stringify({ ...valid, mapId: 'donjon-supprime' }), known), null);
});

check('une orientation invalide est refusee', () => {
  assert.equal(parseSave(JSON.stringify({ ...valid, facing: 'nord-ouest' }), known), null);
});

check('une case malformee est refusee', () => {
  assert.equal(parseSave(JSON.stringify({ ...valid, tile: { x: '3', y: 4 } }), known), null);
  assert.equal(parseSave(JSON.stringify({ ...valid, tile: null }), known), null);
});

check('une progression malformee est refusee', () => {
  assert.equal(parseSave(JSON.stringify({ ...valid, questsSeen: 'trust-flow' }), known), null);
  assert.equal(parseSave(JSON.stringify({ ...valid, techsSeen: [1, 2] }), known), null);
});

check('la sourdine absente vaut « son actif »', () => {
  const s = parseSave(JSON.stringify({ ...valid, muted: undefined }), known);
  assert.ok(s);
  assert.equal(s.muted, false);
});

console.log(`\n${passed} assertions passees\n`);
