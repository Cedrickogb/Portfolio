/**
 * Cycle jour / nuit.
 *
 * L'heure vient de l'horloge du visiteur, pas d'un temps de jeu accéléré : un
 * recruteur qui ouvre le portfolio à 22 h arrive de nuit, lampadaires allumés.
 * Un cycle accéléré aurait l'effet inverse de celui recherché — au bout de
 * trente secondes de visite, l'ambiance clignoterait.
 *
 * Corollaire assumé : la moitié des visiteurs ne verront jamais la nuit. C'est
 * pourquoi la phase se force aussi depuis le menu ; sans cette bascule, le
 * travail resterait invisible pour la plupart des gens.
 *
 * Module sans dépendance : il tourne dans node, donc il se teste.
 */
export type Phase = 'dawn' | 'day' | 'dusk' | 'night';

/** Ordre du cycle, aussi celui de la bascule manuelle. */
export const PHASES: readonly Phase[] = ['dawn', 'day', 'dusk', 'night'];

export interface Ambience {
  label: string;
  /**
   * Teinte appliquée en fondu **multiplicatif** sur l'image.
   *
   * Multiplier plutôt que superposer en transparence : un voile translucide
   * délave les couleurs vers le gris et efface le piqué du pixel art, alors
   * qu'une multiplication conserve les rapports de valeurs — c'est exactement
   * ce que faisaient les palettes de nuit des consoles portables. `null` = plein
   * jour, aucun calque à dessiner.
   */
  tint: string | null;
  /**
   * Voile translucide posé par-dessus la multiplication, pour la teinte.
   *
   * Une multiplication assombrit mais ne déplace pas la teinte : du vert
   * multiplié reste vert, et la nuit avait des airs de sous-bois. Un voile
   * léger en fondu normal, lui, tire toutes les couleurs vers le bleu. Les
   * deux ensemble donnent une nuit *bleue et sombre* sans délaver le pixel art
   * comme le ferait un voile seul, à qui il faudrait une opacité massive pour
   * obtenir le même assombrissement.
   */
  veil: { color: string; opacity: number } | null;
  /** Halos au sol et têtes allumées sous les lampadaires. */
  lamps: boolean;
  /** Facteur sur l'opacité des ombres portées : sans soleil, pas d'ombre. */
  shadow: number;
}

export const AMBIENCE: Record<Phase, Ambience> = {
  dawn: {
    label: 'Aube',
    tint: '#ffc9c0',
    veil: { color: '#ff9ec4', opacity: 0.1 },
    lamps: true,
    shadow: 0.5,
  },
  day: { label: 'Jour', tint: null, veil: null, lamps: false, shadow: 1 },
  dusk: {
    label: 'Crepuscule',
    tint: '#eda87f',
    veil: { color: '#ff8b3d', opacity: 0.1 },
    lamps: true,
    shadow: 0.5,
  },
  night: {
    label: 'Nuit',
    tint: '#5a6bb8',
    veil: { color: '#1e2f8c', opacity: 0.28 },
    lamps: true,
    shadow: 0,
  },
};

/**
 * Phase correspondant à une heure locale.
 *
 * Bornes choisies pour que la nuit couvre la vraie soirée : à 20 h on est de
 * nuit, pas au crépuscule.
 */
export function phaseAt(date: Date): Phase {
  const h = date.getHours();
  if (h >= 6 && h < 8) return 'dawn';
  if (h >= 8 && h < 18) return 'day';
  if (h >= 18 && h < 20) return 'dusk';
  return 'night';
}

/** Phase suivante dans le cycle, pour la bascule du menu. */
export function nextPhase(phase: Phase): Phase {
  return PHASES[(PHASES.indexOf(phase) + 1) % PHASES.length];
}
