/**
 * Synthèse sonore par oscillateurs, sans un seul fichier audio.
 *
 * Même raisonnement que pour les textures : un bruitage de pas est une onde
 * carrée de 40 ms, pas un .wav de 12 ko à télécharger. Le jeu reste à poids
 * constant quel que soit le nombre de sons, et changer une note est une ligne.
 *
 * Le contexte démarre suspendu — les navigateurs l'exigent — et n'est réveillé
 * que par un geste de l'utilisateur, via `unlockAudio()`.
 */

let context: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;

/** Volume général, volontairement bas : un portfolio ne doit pas crier. */
const MASTER_GAIN = 0.18;

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (context) return context;

  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;

  context = new Ctor();
  master = context.createGain();
  master.gain.value = muted ? 0 : MASTER_GAIN;
  master.connect(context.destination);
  return context;
}

/** À appeler depuis un geste utilisateur, sinon le son reste muet. */
export async function unlockAudio(): Promise<void> {
  const ctx = ensureContext();
  if (ctx && ctx.state === 'suspended') await ctx.resume();
}

export function setMuted(value: boolean): void {
  muted = value;
  if (master && context) {
    master.gain.setTargetAtTime(value ? 0 : MASTER_GAIN, context.currentTime, 0.02);
  }
}

export const isAudioReady = (): boolean => context?.state === 'running';

/** Fréquence d'une note MIDI. 69 = la 440. */
export const noteToHz = (note: number): number => 440 * 2 ** ((note - 69) / 12);

export interface ToneOptions {
  type?: OscillatorType;
  /** Durée en secondes. */
  duration?: number;
  gain?: number;
  /** Glissando vers cette fréquence, pour les bruitages. */
  slideTo?: number;
  /** Décalage de départ, en secondes depuis maintenant. */
  at?: number;
}

/**
 * Joue une note. L'enveloppe attaque-déclin évite le « clic » qu'on entend
 * quand une onde démarre ou s'arrête sur une valeur non nulle.
 */
export function playTone(hz: number, options: ToneOptions = {}): void {
  const ctx = ensureContext();
  if (!ctx || !master || ctx.state !== 'running') return;

  const { type = 'square', duration = 0.12, gain = 0.5, slideTo, at = 0 } = options;
  const start = ctx.currentTime + at;

  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(hz, start);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), start + duration);

  const env = ctx.createGain();
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(gain, start + 0.008);
  env.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(env).connect(master);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

/** Horloge du contexte, pour le séquenceur musical. */
export const audioNow = (): number => ensureContext()?.currentTime ?? 0;
