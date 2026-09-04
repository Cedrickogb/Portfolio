import { isDock, isWalkable, npcAt, signDialogueAt, warpAt, type NpcSpec, type ParsedMap, type Travel, type Warp } from './grid';
import { tileAhead, type Direction, type Tile } from './direction';
import type { Lang } from '../../i18n/lang';

/** Ce que le joueur demande à cette frame. */
export interface Input {
  /** Bouton A pressé depuis la frame précédente. */
  a: boolean;
  /** Bouton B pressé depuis la frame précédente. Ignoré hors dialogue : le
   *  monde et les menus le lisent eux-mêmes, par une file séparée.
   *  Optionnel : toute la suite de tests antérieure à ce champ construit
   *  encore des `Input` sans lui, et son absence vaut « non pressé ». */
  b?: boolean;
  /** Direction maintenue, ou null. */
  dir: Direction | null;
}

/** Partie de l'état du jeu dont dépendent les règles. */
export interface Snapshot {
  tile: Tile;
  facing: Direction;
  travel: Travel;
  stepping: boolean;
  /* La langue *est* un état dont dépend le résultat : lire un panneau ne rend
     pas le même texte selon le visiteur. La passer ici garde `decide` pure —
     l'alternative serait d'aller chercher la langue dans un contexte React
     depuis une fonction de règles, ce qui la rendrait intestable. */
  lang: Lang;
  dialogue: { lines: string[]; index: number; revealed: number } | null;
}

export type Intent =
  | { kind: 'idle' }
  | { kind: 'warp'; warp: Warp }
  | { kind: 'talk-npc'; npc: NpcSpec }
  | { kind: 'board' }
  | { kind: 'disembark'; to: Tile }
  | { kind: 'reveal-line' }
  | { kind: 'advance-dialogue' }
  | { kind: 'talk'; lines: string[] }
  | { kind: 'turn'; dir: Direction }
  | { kind: 'step'; dir: Direction; to: Tile };

/**
 * Règles du déplacement, sous forme de fonction pure : mêmes entrées, même
 * sortie, aucun accès au store ni à three.js. C'est ce qui les rend testables
 * hors navigateur — la boucle de rendu ne fait plus qu'appliquer le résultat.
 */
/**
 * Règle du dialogue, isolée pour être partagée.
 *
 * A termine d'abord la ligne en cours (effet machine à écrire), puis enchaîne.
 * Extraite de `decide` parce que le hall en 3D ne passe pas par les règles de
 * déplacement — il n'a ni case ni pas — mais doit obéir *exactement* aux mêmes
 * règles de dialogue. Dupliquée là-bas, elle y avait été oubliée : le panneau
 * s'ouvrait et rien ne pouvait plus le fermer.
 */
export function dialogueIntent(
  a: boolean,
  dialogue: NonNullable<Snapshot['dialogue']>,
  b = false,
): Intent {
  /* B avance un dialogue exactement comme A.
     Une réplique de congé apparaît *en réponse* à un appui sur B (fermer un
     comptoir sans un mot rejoue la formule de départ du personnage) — si B ne
     savait alors plus rien faire, le joueur se retrouvait avec le bouton que
     l'écran venait de lui faire presser qui ne répondait plus à rien. B reste
     un « retour » qui ne tombe jamais dans le vide, même pendant un dialogue. */
  if (!a && !b) return { kind: 'idle' };
  const full = dialogue.lines[dialogue.index].length;
  return dialogue.revealed < full ? { kind: 'reveal-line' } : { kind: 'advance-dialogue' };
}

export function decide(input: Input, s: Snapshot, map: ParsedMap): Intent {
  // Un dialogue ouvert gèle le déplacement.
  if (s.dialogue) return dialogueIntent(input.a, s.dialogue, input.b ?? false);

  // Un pas engagé va toujours jusqu'à la case suivante : pas d'arrêt à mi-chemin.
  if (s.stepping) return { kind: 'idle' };

  /* Téléportation au contact : on entre dans un bâtiment en marchant sur son
     paillasson, pas en pressant une touche. Les destinations sont toujours
     posées *à côté* d'une case de téléportation, jamais dessus — sans quoi
     l'arrivée redéclencherait aussitôt le départ. */
  const warp = warpAt(map, s.tile.x, s.tile.y);
  if (warp) return { kind: 'warp', warp };

  if (input.a) {
    const front = tileAhead(s.tile, s.facing);

    /* Embarquement et débarquement se font depuis un ponton, en regardant vers
       l'élément où l'on veut aller. Deux gestes symétriques, une seule case. */
    if (isDock(map, s.tile.x, s.tile.y)) {
      if (s.travel !== 'boat' && map.kinds[front.y]?.[front.x] === 'water') {
        return { kind: 'board' };
      }
      if (s.travel === 'boat' && isWalkable(map, front.x, front.y, 'foot')
          && map.kinds[front.y]?.[front.x] !== 'water') {
        return { kind: 'disembark', to: front };
      }
    }

    const npc = npcAt(map, front.x, front.y);
    if (npc) return { kind: 'talk-npc', npc };

    /* Derrière un comptoir, on parle à qui se tient de l'autre côté : sans ça,
       il faudrait contourner le meuble pour engager la conversation. */
    const behind = tileAhead(front, s.facing);
    if (map.kinds[front.y]?.[front.x] === 'counter') {
      const clerk = npcAt(map, behind.x, behind.y);
      if (clerk) return { kind: 'talk-npc', npc: clerk };
    }

    const lines = signDialogueAt(map, front.x, front.y, s.lang);
    return lines ? { kind: 'talk', lines } : { kind: 'idle' };
  }

  if (!input.dir) return { kind: 'idle' };

  const to = tileAhead(s.tile, input.dir);
  // Cible bloquée : on pivote sur place, comme dans les jeux d'origine.
  return isWalkable(map, to.x, to.y, s.travel)
    ? { kind: 'step', dir: input.dir, to }
    : { kind: 'turn', dir: input.dir };
}
