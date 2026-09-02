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
import { CAMERA_OFFSET, eaveOcclusion } from '../../game/config';
import { BUILDING_STYLES } from '../../game/assets/buildings';
import { SIGN_H } from '../../game/assets/sign';
import { WORLD_MAP } from '../../data/maps/world-map';
import {
  CONTACT_INTERIOR,
  HALL_INTERIOR,
  LAB_INTERIOR,
  QUESTS_INTERIOR,
  STACKS_INTERIOR,
} from '../../data/maps/interiors';

const map = parseMap(WORLD_MAP);
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
  travel: 'foot',
  stepping: false,
  dialogue: null,
  ...over,
});

console.log('\ngrille');

check('la carte se parse aux dimensions de sa grille', () => {
  /* Pas de taille en dur : elle changerait à chaque agrandissement du bourg et
     le test échouerait sans qu'aucune règle ne soit cassée. Ce qui compte est
     que les dimensions lues correspondent à la grille écrite. */
  assert.equal(map.height, WORLD_MAP.rows.length);
  assert.equal(map.width, WORLD_MAP.rows[0].length);
  assert.ok(map.width > 0 && map.height > 0);
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
  // Bornes dérivées de la carte : elles suivent ses agrandissements.
  assert.equal(isWalkable(map, -1, 5), false);
  assert.equal(isWalkable(map, 5, -1), false);
  assert.equal(isWalkable(map, map.width, 5), false);
  assert.equal(isWalkable(map, 5, map.height), false);
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
    { tile: standing, facing: 'up', travel: 'foot', stepping: false, dialogue: null },
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
    { tile: door, facing: 'down', travel: 'foot', stepping: false, dialogue: null },
    inn,
  );
  assert.equal(r.kind, 'warp');
  assert.equal(r.kind === 'warp' ? r.warp.to : null, 'world');
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

check('tout contenu reste atteignable, a pied ou en barque', () => {
  /* Parcours à deux modes. Le simple parcours à pied ne suffit plus depuis que
     l'île n'est joignable qu'en barque : il déclarerait « injoignable » un
     contenu parfaitement accessible, et interdirait de fait la traversée.
     On alterne donc terre et eau jusqu'à stabilisation — les pontons étant les
     seules cases communes aux deux mondes. */
  const key = (t: { x: number; y: number }) => tileKey(t.x, t.y);
  const atteint = new Set<string>();
  const docks = new Set<string>();

  const parcourir = (depart: { x: number; y: number }, mode: 'foot' | 'boat') => {
    if (!isWalkable(map, depart.x, depart.y, mode)) return;
    const vus = new Set([key(depart)]);
    const file = [depart];
    while (file.length) {
      const t = file.shift()!;
      atteint.add(key(t));
      if (map.kinds[t.y][t.x] === 'dock') docks.add(key(t));
      for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
        const n = { x: t.x + dx, y: t.y + dy };
        if (vus.has(key(n)) || !isWalkable(map, n.x, n.y, mode)) continue;
        vus.add(key(n));
        file.push(n);
      }
    }
  };

  parcourir(map.spawn, 'foot');
  // Chaque ponton atteint ouvre une traversée, qui ouvre de nouvelles terres.
  for (let tour = 0; tour < 4; tour++) {
    for (const d of [...docks]) {
      const [x, y] = d.split(',').map(Number);
      parcourir({ x, y }, 'boat');
      parcourir({ x, y }, 'foot');
    }
  }

  const voisineAtteinte = (t: { x: number; y: number }) =>
    [[0, -1], [0, 1], [-1, 0], [1, 0]].some(([dx, dy]) => atteint.has(tileKey(t.x + dx, t.y + dy)));

  for (const p of map.positions.sign) {
    assert.ok(voisineAtteinte(p), `panneau ${key(p)} injoignable, même en barque`);
  }
  for (const p of map.positions.door) {
    assert.ok(atteint.has(key(p)), `entrée ${key(p)} injoignable, même en barque`);
  }
});

check('l ile ne s atteint pas a pied', () => {
  /* La contrainte qui donne son sens à la barque. Un raccourci ouvert par
     mégarde sur la carte la ferait disparaître sans que rien ne le signale. */
  const key = (t: { x: number; y: number }) => tileKey(t.x, t.y);
  const vus = new Set([key(map.spawn)]);
  const file = [map.spawn];
  while (file.length) {
    const t = file.shift()!;
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (vus.has(key(n)) || !isWalkable(map, n.x, n.y, 'foot')) continue;
      vus.add(key(n));
      file.push(n);
    }
  }
  const entreeDuHall = { x: 76, y: 14 };
  assert.equal(map.kinds[entreeDuHall.y][entreeDuHall.x], 'door');
  assert.ok(!vus.has(key(entreeDuHall)), "le hall est joignable a pied : la barque ne sert plus a rien");
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

console.log('\nenseignes');

/* Une plaque de facade doit rester entierement sous l'ombre du debord.
   On ne verifie pas la formule par la formule : on suit le rayon qui va du
   haut de la plaque vers la camera, et on exige qu'il ait franchi tout le
   debord avant d'atteindre la sous-face du toit. C'est la propriete physique,
   pas son algebre — et c'est elle qui tombait sur le hall. */
check('aucune plaque n est coupee par son debord de toit', () => {
  const pente = CAMERA_OFFSET[1] / CAMERA_OFFSET[2];
  const plaqueH = SIGN_H / 16;

  for (const [nom, style] of Object.entries(BUILDING_STYLES)) {
    const hautPlaque = style.bodyHeight - eaveOcclusion(style.overhang) - 0.08;
    // Hauteur du rayon au nez du toit, en partant du haut de la plaque.
    const auNez = hautPlaque + style.overhang * pente;
    assert.ok(
      auNez <= style.bodyHeight,
      `${nom} : le rayon atteint ${auNez.toFixed(2)} au nez du toit, sous-face a ${style.bodyHeight}`,
    );
    /* Et elle reste au-dessus de la porte, sinon elle la chevauche. La facade
       doit donc etre assez haute pour loger porte + plaque *sous* l'ombre du
       debord : c'est cette contrainte qui fixe `bodyHeight`, pas l'inverse. */
    assert.ok(
      hautPlaque - plaqueH > 1.1,
      `${nom} : plaque a ${(hautPlaque - plaqueH).toFixed(2)}, porte a 1.1 — facade trop basse`,
    );
  }
});

console.log('\nportes');

/* Sortir d'un batiment doit ramener devant sa porte, pas ailleurs sur la carte.
   Le bug d'origine venait du cablage React, pas de cette donnee — mais une
   destination erronee produirait exactement le meme symptome, en silence. */
const INTERIEURS: [string, typeof QUESTS_INTERIOR][] = [
  ['lab', LAB_INTERIOR],
  ['quests', QUESTS_INTERIOR],
  ['stacks', STACKS_INTERIOR],
  ['contact', CONTACT_INTERIOR],
  ['hall', HALL_INTERIOR],
];

check('chaque sortie ramene sur le paillasson du batiment', () => {
  for (const [id, interieur] of INTERIEURS) {
    const sorties = Object.values(interieur.warps ?? {});
    assert.equal(sorties.length, 1, `${id} : une seule sortie attendue`);
    const arrivee = sorties[0].at;

    // L'entree correspondante, cote monde : le paillasson qui mene ici.
    const entree = Object.entries(WORLD_MAP.warps ?? {}).find(([, w]) => w.to === id);
    assert.ok(entree, `${id} : aucune entree depuis le monde`);
    const [ex, ey] = entree[0].split(',').map(Number);

    assert.ok(isWalkable(map, arrivee.x, arrivee.y), `${id} : arrivee infranchissable`);
    const distance = Math.abs(arrivee.x - ex) + Math.abs(arrivee.y - ey);
    assert.ok(distance <= 1, `${id} : on ressort a ${distance} cases du paillasson`);
    // Et surtout pas sur le paillasson lui-meme : on rentrerait aussitot.
    assert.ok(distance === 1, `${id} : on ressort sur le paillasson`);
  }
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
