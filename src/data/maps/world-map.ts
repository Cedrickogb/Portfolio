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
  '#ggg..gggg..gggg..gggg..gggg..gggg..gggg.................s~~~~s................................#',
  '#..gggg..gggg..gggg..gggg..gggg..gggg..ggg...............s~~~~s................................#',
  '#ggg..gggg..gggg..gggg..gggg..gggg..gggg.................s~~~~s................................#',
  '#.^^^^^^.gggg..gggg..gggg..gggg..gggg..ggg...............s~~~~s................................#',
  '#g^^^^^^gg..gggg..gggg..gggg..gggg..gggg.................s~~~~s................................#',
  '#.^^^^^^.gggg..gggg.^^^^^^^^^gg..gggg..ggg...............s~~~~s.^^^^^^.........................#',
  '#g^^^^^^gg..gggg..gg^^^^^^^^^.gggg..gggg.................s~~~~s.^^^^^^.........................#',
  '#.^^^^^^TTggg..gggg.^^^^^^^^^gg..gggg..ggg...............s~~~~s.^^^^^^..HHHHHHHHH..............#',
  '#g^^^^^^gg.*gggg.*gg^^^^^^^^^.gggg..gggg.................s~~~~s.^^^^^^..HHHHHHHHH..............#',
  '#.^^^^^^.gggHHHHHgg.^^^^^^^^^gg..gggg..ggg...............s~~~~s.^^^^^^..HHHHHHHHH.....TT.......#',
  '#g^^^^^^gg..HHHHH.gg^^^^^^^^^.gggg..gggg.................s~~~~s.........HHHHHHHHH..............#',
  '#..gggg..gggHHHHHgg..gggg..gggg..gggg..ggg...............s~~~~s.........HHHHHHHHH..............#',
  '#ggg..gggg..HHHHH.gggg..gggg..gggg..gggg.................s~~~~s.........HHHHHHHHH..............#',
  '#..gggg.bgggg.Dgggg..gggg..gggg..gggg..ggg...............s~~~~s.............D..................#',
  '#ggg..gggg.ooooooogggg..gggg..gggg..gggg.................s~~~~s........ooooooooooo.............#',
  '#..gggg..ggooooooog..gggTT.gggg..gggb..ggg...............s~~~~s......5.ooooooooooo.............#',
  '#ggg..gggg1.g===..gggg..gggg..gggg..gggg.................s~~~~s.......==.......................#',
  '#..gggg..gggL===ggg..gggg..gggg..gggg..ggg...............s~~~~s.......==............^^^^^^^^...#',
  '#ggg..gggg..g===..gggg..gggg..gggg..gggg.................s~~~~////////==////////////^^^^^^^^//.#',
  '#..g^^^^^^^^g===ggg..gggg..gggg..gggTT.ggg........TT.....s~~~~s..sss.L==s..sss..sss.^^^^^^^^s..#',
  '#ggg^^^^^^^^g===..gggg..gggg..gggg//gggg/////.....T.T....s~~~~ssss..ss==.sss..sss..s^^^^^^^^.ss#',
  '#..g^^^^^^^^g===bgg..gggg..gggg..gggg..ggg...............s~~~~ss..sss.==ss..sss..sss^^^^^^^^ss.#',
  '#ggg^^^^^^^^g===..gggg..gggg..gggg..gggg.................s~~~~s.sss..s==..sss..sss..^^^^^^^^..s#',
  '#..g^^^^^^^^g===Lgg..gggg..gbgg..gggg..ggg...===.........s~~~~sssT.sss==sss..sss..sss..sss..sss#',
  '#ggg..gggg..g===..gggg..gggg..gggg..gggg.....===.........s~~~~s.Tsss..==s..sss..sss..sss..sss..#',
  '#..gggg..gggg===ggg..gggg..gggg..gggg..ggg..L=L=.........s~~~~ssss..ss==Lsss..sss..sss..sss..ss#',
  '#ggg//gggg//L===//gggg//gggg//gggg//gggg/....===.........s~~~~ss..sss.==ss..sss..sss..sss..sss.#',
  '#.....b......===..b.L.....b.....L.b..........===.........s~~~~s.sss..s==..sss..sss..sss..sss..s#',
  '#...............================================.........s~~~~ssssssssQssssssssssssssssssssssss#',
  '#...............================================.........s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#.........b...............L...........L......===.........s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#.....................b......................===L........s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#......................T..T..T..T..T..T..T..T===..T..T...s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#......................T..T..T..T..T..T..T..T===..T..T...s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#............................................===.........s~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#',
  '#.....T...................TT.................====L====================Qssssssssssssssssssssssss#',
  '#.........................T.T................=========================////////////////////////.#',
  '#.........T.................................L===..L...../.r..rLr.r..r.r.r..r.r.rB.r.r.r.Tr.r.r.#',
  '#..........**.....**.........................===......../rBr.r..r.r.r..B.r.**.r.r.**.r.rBr..r.r#',
  '#...........HHHHHH........................L..===..L...../r..r.rBr..r.r.r..r.HHHHHH.r.r..r.r.r..#',
  '#...........HHHHHH.......................************.../.r.r..r.r.r..r.r.r.HHHHHH..r.r.r..r.r.#',
  '#...........HHHHHH.......................oooooooooooo.../..r.r.r..r.r.r..r.rHHHHHHr.r..r.r.r..r#',
  '#...........HHHHHH.......................oooooPoooooo.../r.r..r.r.r..r.r.r..HHHHHH.r.r.r..r.r.r#',
  '#.......TT....D.....1.L.......TT..L......ooooo4ooooo3.../.L.TTr..r.r.rL.r.2.r.Dr.r.r..r.r.r.Br.#',
  '#.......T.Toooooooo======================oooooooooooo======================oooooooo.r.r..r.r.r.#',
  '#..........oooooooo======================oooooLoLoooo======================oooooooo..r.r.rT.r.r#',
  '#.............L.............L...........Loooooooooooo.../r..r.r.L..r.r.r..r.r.L..r.r.r..r.r.r..#',
  '#...........................................HHHHH......./.r.r..r.r.r..r.r.r..r.r.r..r.r.r..r.r.#',
  '#.........................................L.HHHHH.L...../..r.r.r..r.r.r..r.r.r..r.r.r..r.r.r..r#',
  '#...^^^^^^^^^^....................TT........HHHHH......./r.r..r.r.T..r.r.r..r.r.r..r^^^^^^^^^.r#',
  '#...^^^^^^^^^^....................T.T.......HHHHH......./.r.r.r..r.r.r..r.r.r..r.r.r^^^^^^^^^r.#',
  '#...^^^^^^^^^^..........T.....................D........./Tr.Br.r.r..r.r.r..r.r.r..r.^^^^^^^^^r.#',
  '#...^^^^^^^^^^.............................ooooooo....../rTr.r..r.r.r..r.r.r..r.r.r.^^^^^^^^^.r#',
  '#...^^^^^^^^^^....................T........ooooooo....../r..r.r.r..r.r.r..r.r.r..r.r^^^^^^^^^..#',
  '#...^^^^^^^^^^........................................../.r.r..r.r.r..r.r.r..r.r.r..^^^^^^^^^r.#',
  '#.......................^^^^^^^^^^^^................T.../..r.r.r..r.r.r..rBr.r..r.r.r..r.r.r..r#',
  '#.......................^^^^^^^^^^^^..................../r.r..r.r.r..r.r.r..r.r.r..r.r.r..r.r.r#',
  '#.......................^^^^^^^^^^^^....................^^^^^^^^^^^^^^..r.r.r..r.r.r..B.r.r..r.#',
  '#.......................^^^^^^^^^^^^....................^^^^^^^^^^^^^^r.r..r.r.r..r.r.r..r.r.r.#',
  '#...................T...^^^^^^^^^^^^....................^^^^^^^^^^^^^^.r.r.rT.r.r.r..r.r.r..r.r#',
  '#.......................................................^^^^^^^^^^^^^^.r..r.r.r..r.r.r..r.r.r..#',
  '#......................................................./.r.r..r.r.r..r.r.r..r.r.r..r.r.r..r.r.#',
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
    '4': {
      en: [
        "Uppercase Town, where the roads meet.",
        "The bike is in the menu: B, then \u201cBike\u201d.",
        "East, a dock. The isle is only reached by boat.",
      ],
      fr: [
        "Bourg d'Uppercase+, au carrefour des routes.",
        "Le vélo se prend dans le menu : B, puis « Vélo ».",
        "À l'est, un ponton. L'île ne s'atteint qu'en barque.",
      ],
    },
    '1': {
      en: [
        "Lab Valley. The workbench and the CV.",
        "The south road runs back down to town.",
      ],
      fr: [
        "Vallon du labo. Le poste de travail et le CV.",
        "La route du sud redescend vers le bourg.",
      ],
    },
    '6': {
      en: ["Quest District: the registry of shipped projects."],
      fr: ["Quartier des quêtes : le registre des projets livrés."],
    },
    '2': {
      en: ["Stack Plateau: the technology inventory."],
      fr: ["Plateau des stacks : l'inventaire des technologies."],
    },
    '3': {
      en: [
        "Follow the east road to the dock,",
        "then row across the strait.",
      ],
      fr: [
        "Suis la route de l'est jusqu'au ponton,",
        "puis traverse le détroit en barque.",
      ],
    },
    '5': {
      en: [
        "Trophy Isle. The professional journey,",
        "one stele per step. Walk up to read.",
      ],
      fr: [
        "Île des trophées. Le parcours professionnel,",
        "une stèle par étape. Approche-toi pour lire.",
      ],
    },
  },

};
