/**
 * Tests des règles du moteur, exécutables hors navigateur.
 *   npm run test:engine
 *
 * Les imports sont relatifs et les modules testés n'ont aucune dépendance à
 * React ni à three.js : c'est précisément ce qui rend ce test possible.
 */
import assert from 'node:assert/strict';
import { isWalkable, parseMap, signDialogueAt, tileKey, type ParsedMap } from './grid';
import { decide, type Snapshot } from './movement';
import { tileAhead, type Direction } from './direction';
import { TOWN_MAP } from '../../data/maps/town-map';
import { QUESTS_INTERIOR } from '../../data/maps/interiors';

const map = parseMap(TOWN_MAP);
const inn = parseMap(QUESTS_INTERIOR);

let passed = 0;
function check(label: string, fn: () => void) {
  fn();
  passed++;
  console.log(`  ok  ${label}`);
}

const snap = (over: Partial<Snapshot> = {}): Snapshot => ({
  tile: { ...map.spawn },
  facing: 'down',
  stepping: false,
  dialogue: null,
  ...over,
});

console.log('\ngrille');

check('la carte se parse aux bonnes dimensions', () => {
  assert.equal(map.width, 40);
  assert.equal(map.height, 25);
});

check('le spawn est sur du sol traversable', () => {
  assert.ok(isWalkable(map, map.spawn.x, map.spawn.y));
});

check('les bords bloquent', () => {
  assert.equal(isWalkable(map, 0, 0), false);
  assert.equal(isWalkable(map, 20, 0), false);
  assert.equal(isWalkable(map, 0, 12), false);
});

check('hors carte bloque, sans lever d erreur', () => {
  assert.equal(isWalkable(map, -1, 5), false);
  assert.equal(isWalkable(map, 40, 5), false);
  assert.equal(isWalkable(map, 5, 25), false);
});

check('decors et panneaux bloquent', () => {
  for (const group of Object.values(map.positions.props)) {
    for (const p of group) assert.equal(isWalkable(map, p.x, p.y), false);
  }
  for (const p of map.positions.sign) assert.equal(isWalkable(map, p.x, p.y), false);
});

check('chemins et paillassons se traversent', () => {
  assert.ok(map.positions.path.length > 0, 'aucun chemin dans la carte');
  assert.ok(map.positions.door.length > 0, 'aucun paillasson dans la carte');
  for (const p of map.positions.path) assert.ok(isWalkable(map, p.x, p.y), `chemin ${p.x},${p.y}`);
  // Un paillasson bloquant ne declencherait jamais son entree.
  for (const p of map.positions.door) assert.ok(isWalkable(map, p.x, p.y), `paillasson ${p.x},${p.y}`);
});

console.log('\ninterieurs');

check('le plancher se traverse, comptoirs et personnages bloquent', () => {
  assert.ok(inn.positions.wood.length > 0, 'aucun plancher dans l interieur');
  for (const p of inn.positions.wood) assert.ok(isWalkable(inn, p.x, p.y), `plancher ${p.x},${p.y}`);
  assert.ok(inn.positions.counter.length > 0, 'aucun comptoir');
  for (const p of inn.positions.counter) assert.equal(isWalkable(inn, p.x, p.y), false);
  for (const t of inn.npcTiles) assert.equal(isWalkable(inn, t.x, t.y), false);
});

check('on parle au personnage par-dessus le comptoir', () => {
  /* Sans cette regle il faudrait contourner le meuble pour engager la
     conversation, ce qu'aucun jeu ne demande. */
  const npc = inn.npcTiles[0];
  const standing = { x: npc.x, y: npc.y + 2 }; // comptoir entre les deux
  assert.equal(inn.kinds[npc.y + 1][npc.x], 'counter', 'pas de comptoir entre les deux');
  const r = decide(
    { a: true, dir: null },
    { tile: standing, facing: 'up', stepping: false, dialogue: null },
    inn,
  );
  assert.equal(r.kind, 'talk-npc');
});

check('le personnage du registre ouvre le menu des quetes', () => {
  const npc = inn.npcs[`${inn.npcTiles[0].x},${inn.npcTiles[0].y}`];
  assert.equal(npc.menu, 'quests');
  assert.ok(npc.lines.length > 0, 'personnage muet');
});

check('un paillasson declenche la teleportation', () => {
  const door = inn.positions.door[0];
  const r = decide(
    { a: false, dir: null },
    { tile: door, facing: 'down', stepping: false, dialogue: null },
    inn,
  );
  assert.equal(r.kind, 'warp');
  assert.equal(r.kind === 'warp' ? r.warp.to : null, 'town');
});

check('une carte irreguliere est rejetee', () => {
  assert.throws(
    () => parseMap({ name: 'x', rows: ['###', '##'], dialogues: {} }),
    /irr/i,
  );
});

check('une carte sans spawn est rejetee', () => {
  assert.throws(() => parseMap({ name: 'x', rows: ['###', '#.#', '###'], dialogues: {} }), /spawn/i);
});

console.log('\ncontenu de la carte');

check('chaque panneau a des repliques', () => {
  assert.ok(map.positions.sign.length > 0, 'aucun panneau dans la carte');
  for (const p of map.positions.sign) {
    const lines = signDialogueAt(map, p.x, p.y);
    assert.ok(lines && lines.length > 0, `panneau ${tileKey(p.x, p.y)} sans replique`);
  }
});

check('chaque panneau est atteignable depuis le spawn', () => {
  // Parcours en largeur sur les cases traversables, depuis le spawn.
  const seen = new Set<string>([tileKey(map.spawn.x, map.spawn.y)]);
  const queue = [map.spawn];
  while (queue.length) {
    const t = queue.shift()!;
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const nx = t.x + dx;
      const ny = t.y + dy;
      const k = tileKey(nx, ny);
      if (!seen.has(k) && isWalkable(map, nx, ny)) {
        seen.add(k);
        queue.push({ x: nx, y: ny });
      }
    }
  }
  // Un panneau est atteignable si une case adjacente traversable est atteinte.
  for (const p of map.positions.sign) {
    const adjacent = [[0, -1], [0, 1], [-1, 0], [1, 0]].some(([dx, dy]) =>
      seen.has(tileKey(p.x + dx, p.y + dy)),
    );
    assert.ok(adjacent, `panneau ${tileKey(p.x, p.y)} enferme : injoignable depuis le spawn`);
  }
});

console.log('\nregles de deplacement');

check('sans entree, rien ne se passe', () => {
  assert.deepEqual(decide({ a: false, dir: null }, snap(), map), { kind: 'idle' });
});

check('une direction vers du sol libre produit un pas', () => {
  // Direction déduite de la carte : l'assertion porte sur la règle, pas sur
  // une case codée en dur qui casserait à la moindre retouche du décor.
  const open = (['up', 'down', 'left', 'right'] as Direction[]).find((d) => {
    const t = tileAhead(map.spawn, d);
    return isWalkable(map, t.x, t.y);
  });
  assert.ok(open, 'le spawn est enfermé : aucune direction libre');
  const to = tileAhead(map.spawn, open);
  assert.deepEqual(decide({ a: false, dir: open }, snap(), map), { kind: 'step', dir: open, to });
});

check('les paillassons sont praticables', () => {
  // Un paillasson bloquant ne se declencherait jamais.
  assert.ok(map.positions.door.length > 0, 'aucun paillasson sur la carte');
  for (const d of map.positions.door) assert.ok(isWalkable(map, d.x, d.y), `${d.x},${d.y}`);
});

check('A au spawn parle au panneau place devant', () => {
  // Le prototype place volontairement un panneau dans l'axe du regard initial.
  const front = tileAhead(map.spawn, 'down');
  const lines = signDialogueAt(map, front.x, front.y);
  assert.ok(lines, `aucun panneau en ${tileKey(front.x, front.y)}`);
  const r = decide({ a: true, dir: null }, snap({ facing: 'down' }), map);
  assert.deepEqual(r, { kind: 'talk', lines });
});

check('une direction vers un mur fait pivoter sans avancer', () => {
  // Case collee au bord haut de la carte : au-dessus, c est le mur.
  const s = snap({ tile: { x: 5, y: 1 } });
  assert.deepEqual(decide({ a: false, dir: 'up' }, s, map), { kind: 'turn', dir: 'up' });
});

check('un pas en cours ignore toute nouvelle direction', () => {
  const s = snap({ stepping: true });
  assert.deepEqual(decide({ a: false, dir: 'left' }, s, map), { kind: 'idle' });
});

check('A face a un panneau ouvre le bon dialogue', () => {
  const sign = map.positions.sign[0];
  // On se place au-dessus du panneau, tourne vers le bas.
  const s = snap({ tile: { x: sign.x, y: sign.y - 1 }, facing: 'down' });
  const r = decide({ a: true, dir: null }, s, map);
  assert.equal(r.kind, 'talk');
  assert.deepEqual(r.kind === 'talk' ? r.lines : null, signDialogueAt(map, sign.x, sign.y));
});

check('A dans le vide ne declenche rien', () => {
  assert.deepEqual(decide({ a: true, dir: null }, snap({ facing: 'up' }), map), { kind: 'idle' });
});

console.log('\nregles de dialogue');

const dlg = (revealed: number) => ({ lines: ['abcdef', 'ghi'], index: 0, revealed });

check('A revele d abord la fin de la ligne', () => {
  const s = snap({ dialogue: dlg(3) });
  assert.deepEqual(decide({ a: true, dir: null }, s, map), { kind: 'reveal-line' });
});

check('A sur une ligne complete fait avancer', () => {
  const s = snap({ dialogue: dlg(6) });
  assert.deepEqual(decide({ a: true, dir: null }, s, map), { kind: 'advance-dialogue' });
});

check('un dialogue ouvert gele le deplacement', () => {
  const s = snap({ dialogue: dlg(6) });
  assert.deepEqual(decide({ a: false, dir: 'down' }, s, map), { kind: 'idle' });
});

console.log(`\n${passed} assertions passees\n`);
