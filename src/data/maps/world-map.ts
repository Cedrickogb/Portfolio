import type { GameMap } from '@/game/engine/grid';

/** Le monde : 96x64, cinq territoires reliés par des routes.
 *
 *  Légende
 *    '.' herbe   '=' terre   'o' dalles   '^' hautes herbes   '*' massif
 *    '~' eau     'Q' ponton (praticable à pied *et* en barque)
 *    's' grève   'r' roche du plateau   'g' lande du vallon
 *    'D' paillasson   '#' bordure   'H' bâtiment (bloc rectangulaire)
 *    '/' falaise (gradin infranchissable)   'B' rocher   'b' buisson
 *    'T' arbre   'L' lampadaire   'P' spawn   '1'..'9' panneau
 *
 *  L'île des trophées est **volontairement injoignable à pied** : le seul accès
 *  est la barque, entre les deux pontons du détroit. Le générateur vérifie cette
 *  propriété par parcours en largeur — un raccourci ouvert par mégarde priverait
 *  la barque de sa raison d'être.
 */
export const WORLD_MAP: GameMap = {
  name: 'Monde',
  rows: [
  '################################################################################################',
  '#........g..gggg.....g......g.g.gggg....gg...............s~~~~s................................#',
  '#...........gggg............g.gggggg....gg...............s~~~~s................................#',
  '#..^........gggg.............g.ggggg....gg...............s~~~~s................................#',
  '#g^^^.^...g.ggggggggggggggggggggg..g....gg...............s~~~~s................................#',
  '#g^^^^.^g..gggggggggggggggggggggg.g.....gg...............s~~~~s......^.........................#',
  '#g.^^^^^....gggggggg^^.^^^^^^g.g..g.....g................s~~~~s.....^^.........................#',
  '#g.^^^^^....gggggggg^^^^^^.^^ggg.g.g....g................s~~~~s.^^^^^..........................#',
  '#g^^^^^^TTgg....gggg.^^^^^^^^gggggggggggg................s~~~~s.^^^^^...HHHHHHHHH..............#',
  '#g^^^^^..g.*....g*gg..^^^^^.^ggg.g.ggggg.................s~~~~s.^^^^^...HHHHHHHHH..............#',
  '#g^^^^^^ggggHHHHHggg^^^^^^^^^ggggggggggg.................s~~~~s.^^..^^^^HHHHHHHHH.....TT.......#',
  '#g^^...^.gg.HHHHHggg^^^..^^^^ggg..ggggggg................s~~~~s.^.......HHHHHHHHH..............#',
  '#.g^^..^.g.gHHHHH...^...gggg...ggg.......................s~~~~s.........HHHHHHHHH..............#',
  '#..^...^...gHHHHH...^...gggg......g......................s~~~~s.........HHHHHHHHH..............#',
  '#......^b.g..gD.........ggggg......g.....................s~~~~s.............D..................#',
  '#......^.g.ooooooo......gggg.gggg.gg.....................s~~~~s........ooooooooooo.............#',
  '#.......gggooooooo....g.TT..........bggg.................s~~~~s......5.ooooooooooo.............#',
  '#.......gg1g.===....gg.g............gggg.................s~~~~s.......==.................^.....#',
  '#.......gggg.===....gggg....g.......gggg.................s~~~~s.......==..............^^^^^^^..#',
  '#.....^^gggg.===....gggg.......g....gggg.................s~~~~////////==/////////////^^^^^^///.#',
  '#ggg^^^^^.^^g===ggggggg........gg.g.TTg...........TT.....s~~~~ssss....==s..sss...sss^^.^...^s..#',
  '#ggg^.^.^^^^g===gggg..........///////////////.....T.T....s~~~~ssssssss==ssssssssss.s^^^^^....ss#',
  '#ggg^^^^^^^^g===bgggg.gg.....gg..........................s~~~~ssssssss==sss...sssss^^^^.^^^^..s#',
  '#ggg^^^^^^^^g===ggggggg........g..g.g.g..................s~~~~ssssssss==ssss..sss...^^^..^^..ss#',
  '#g.^^^..^^^.g===gggggggg....bggg.gg.ggg.gg...===.........s~~~~ssss...s==sss.....s...sssssssss..#',
  '#g..ggggggggg===gggggggg....gggg.g..gg.ggg...===.........s~~~~ssssT..s==sss...ss.s..sssss.sss..#',
  '#..ggggg.gggg===gggggggg....ggggg..g.ggggg...=L=.........s~~~~ssss...s==sss...s.s...sssss.sss..#',
  '#.///////////===/////////////////////////....===.........s~~~~sssssss.==...sss.ssssssssssssssss#',
  '#.....b......===..b.......b.......b..........===.........s~~~~sssssss.==...ssss..ssssssssssssss#',
  '#...............================================.........s~~~~ssssssssQssssssssssssssssssssssss#',
  '#...............================================.........s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#.........b..................................===.........s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#.....................b......................===.........s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#......................T..T..T..T..T..T..T..T===..T..T...s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#......................T..T..T..T..T..T..T..T===..T..T...s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#............................................===.........s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#.....T...................TT.................====L====================Qssssssssssssssssssssssss#',
  '#.........................T.T................=========================////////////////////////.#',
  '#.........T..................................===......../...rrr..r..r...rrr.....Brrr....T.rrrrr#',
  '#..........**.....**.........................===......../.B...r.r....rrBrrr**rrrrr**rr.rBr.....#',
  '#...........HHHHHH...........................===......../......B.....rrrrrrrHHHHHHrrrr.rrr.....#',
  '#...........HHHHHH.......................************.../...r........rrrrrrrHHHHHH.r.rrrrr.....#',
  '#...........HHHHHH.......................oooooooooooo.../rrr...rrr...rrrr.rrHHHHHHrrrrrrrrrrrr.#',
  '#...........HHHHHH.......................oooooPoooooo.../r.....rrr...rrrr..rHHHHHHrrrrrrrrrrr..#',
  '#.......TT....D.....6.........TT.........ooooo4ooooo3.../rrrTT.rrr...rrrrr2rrrDrrrrrrrrrrrrrBr.#',
  '#.......T.Toooooooo======================oooooooooooo======================oooooooo.rrr.......r#',
  '#..........oooooooo======================oooooLoLoooo======================oooooooo.rrr...T...r#',
  '#.............L..........................oooooooooooo.../rrrrrr...............Lrr...rrr......rr#',
  '#...........................................HHHHH......./..r...rrrrrr......rrr.........rrrrrrrr#',
  '#...........^...............................HHHHH......./..r...rrrr........rrr...r.r...rrrrrrrr#',
  '#...^..^.^^.^^....................TT........HHHHH......./..r...rrrTrr.r....rrr.....r^...^^^^.rr#',
  '#..^^^^^^^^^^^....................T.T.......HHHHH......./.rrrrr.r.rrr.rrrrr...rrr..^^^..^^^^^rr#',
  '#....^^^^^^^^^..........T.....................D........./T..Brrrr.rrrrr.rrr...rrr.......T^^^.rr#',
  '#...^.^..^^^^^.............................ooooooo....../rr.rrr...rrr.rrrrr...rrr..^^.^.^^^^^rr#',
  '#...^^^^.^^^^.....................T........ooooooo....../r.....rrr...rrrrrr......rrr^.^^^^^^.r.#',
  '#.....^.^..^^...........^........^....................../rr....rrr...rrrrrr......rrr^^^^^^^^^rr#',
  '#...........^...........^^^.^^.^^^^.................T.../......rrr...rrrrrB......rrrrrr^..rrr..#',
  '#...........^^^...........^^^^^.^^.^..................../...rrrrrrrrrrrr.........rrrrrr.......r#',
  '#...........^^^.........^.^^^^^.^^^^....................^..^.^^^^^.^^^rr.........rrrrrB.....rr.#',
  '#.............^^..........^^^^^.^^^...................../..^..^^^^..^^rr.........rrrrrr.....r.r#',
  '#..............^^...T.....^^^^^^^^^^...................^^...^^^^^^^.^...rrr.T.......rrrrrr.r.rr#',
  '#.........................^.^^...^^^....................^^^^^.^^^^^.^^..rrrr.r......rrrrrr.....#',
  '#......................................................./r.r.rr...rrr....rrrrr......rrrrrr.....#',
  '################################################################################################',
  ],
  buildings: {
    '12,10': { label: 'LAB', style: 'lab' },
    '12,40': { label: 'QUESTS', style: 'quests' },
    '76,40': { label: 'STACKS', style: 'stacks' },
    '44,48': { label: 'CONTACT', style: 'contact' },
    '72,8': { label: 'HALL', style: 'hall' },
  },
  warps: {
    '14,14': { to: 'lab', at: { x: 8, y: 10 }, facing: 'up' },
    '14,44': { to: 'quests', at: { x: 8, y: 10 }, facing: 'up' },
    '78,44': { to: 'stacks', at: { x: 8, y: 10 }, facing: 'up' },
    '46,52': { to: 'contact', at: { x: 8, y: 10 }, facing: 'up' },
    '76,14': { to: 'hall', at: { x: 9, y: 12 }, facing: 'up' },
  },
  dialogues: {
    '4': [
      "Bourg d'Uppercase+, au carrefour des routes.",
      "Le velo se prend dans le menu : B, puis « Velo ».",
      "A l'est, un ponton. L'ile ne s'atteint qu'en barque.",
    ],
    '1': [
      "Vallon du labo. Le poste de travail et le CV.",
      "La route du sud redescend vers le bourg.",
    ],
    '6': [
      "Quartier des quetes : le registre des projets livres.",
    ],
    '2': [
      "Plateau des stacks : l'inventaire des technologies.",
    ],
    '3': [
      "Suis la route de l'est jusqu'au ponton,",
      "puis traverse le detroit en barque.",
    ],
    '5': [
      "Ile des trophees. Le parcours professionnel,",
      "une stele par etape. Approche-toi pour lire.",
    ],
  },
};
