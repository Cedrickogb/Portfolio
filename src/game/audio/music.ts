import { audioNow, noteToHz, playTone } from './synth';

/**
 * Boucle musicale, séquencée par horloge audio.
 *
 * Un `setInterval` qui jouerait les notes directement dériverait : les timers
 * du navigateur sont approximatifs, et le décalage s'entend au bout de quelques
 * mesures. On planifie donc à l'avance sur l'horloge du contexte audio, qui
 * elle est exacte, et le timer ne sert qu'à réveiller le planificateur.
 */

/**
 * Une piste par territoire.
 *
 * Les mélodies partagent le même moteur : seules changent l'échelle, la basse
 * et le tempo. C'est assez pour qu'on sente qu'on a changé de région, et bien
 * moins coûteux qu'autant de fichiers audio.
 */
export interface Track {
  bpm: number;
  /** Croches ; `null` = silence. */
  lead: (number | null)[];
  /** Une note par temps. */
  bass: number[];
  leadWave: OscillatorType;
}

export const TRACKS: Record<string, Track> = {
  village: {
    bpm: 104, leadWave: 'square',
    lead: [69, null, 72, 74, 76, null, 74, 72, 69, null, 67, 69, 72, null, 69, null],
    bass: [45, 45, 48, 48, 41, 41, 43, 43],
  },
  quests: {
    bpm: 112, leadWave: 'square',
    lead: [76, 74, 72, 74, 76, 76, null, 72, 74, 72, 69, 72, 74, null, 76, null],
    bass: [45, 45, 40, 40, 43, 43, 45, 45],
  },
  stacks: {
    bpm: 120, leadWave: 'sawtooth',
    lead: [67, 71, 74, 71, 67, null, 66, 62, 64, 67, 71, 67, 64, null, 62, null],
    bass: [43, 43, 47, 47, 40, 40, 42, 42],
  },
  lab: {
    bpm: 88, leadWave: 'triangle',
    lead: [72, null, 76, null, 79, null, 76, null, 74, null, 71, null, 74, null, null, null],
    bass: [48, 48, 43, 43, 45, 45, 40, 40],
  },
  /** Le détroit : lent, sans lead marqué — on rame. */
  water: {
    bpm: 76, leadWave: 'sine',
    lead: [64, null, null, 67, null, null, 71, null, 69, null, null, 67, null, null, null, null],
    bass: [40, 40, 40, 40, 38, 38, 38, 38],
  },
  /** L'île : plus solennel, on visite un monument. */
  hall: {
    bpm: 72, leadWave: 'triangle',
    lead: [77, null, 76, null, 72, null, 74, null, 76, null, null, 69, null, null, null, null],
    bass: [41, 41, 36, 36, 38, 38, 40, 40],
  },
};

let current: Track = TRACKS.village;
/** Fenêtre de planification : on remplit toujours 200 ms d'avance. */
const LOOKAHEAD = 0.2;
const TICK_MS = 60;

let timer: number | null = null;
let nextNote = 0;
let step = 0;

function schedule() {
  const now = audioNow();
  if (now === 0) return; // contexte pas encore réveillé

  if (nextNote === 0) nextNote = now + 0.1;

  const beat = 60 / current.bpm;

  while (nextNote < now + LOOKAHEAD) {
    const at = nextNote - now;

    const lead = current.lead[step % current.lead.length];
    if (lead !== null) {
      playTone(noteToHz(lead), { type: current.leadWave, duration: beat * 0.4, gain: 0.15, at });
    }
    // La basse tombe sur les temps, soit une croche sur deux.
    if (step % 2 === 0) {
      const bass = current.bass[Math.floor(step / 2) % current.bass.length];
      playTone(noteToHz(bass), { type: 'triangle', duration: beat * 0.8, gain: 0.19, at });
    }

    nextNote += beat / 2;
    step++;
  }
}

export function startMusic(track = 'village'): void {
  current = TRACKS[track] ?? TRACKS.village;
  if (timer !== null) return;
  nextNote = 0;
  timer = window.setInterval(schedule, TICK_MS);
}

/**
 * Change de piste sans couper le flux.
 *
 * Les notes déjà planifiées finissent de sonner, la nouvelle mélodie prend le
 * relais à la mesure suivante : on évite le silence brutal qu'un arrêt-relance
 * produirait au franchissement de chaque frontière.
 */
export function setTrack(track: string): void {
  const next = TRACKS[track];
  if (!next || next === current) return;
  current = next;
  step = 0;
}

export function stopMusic(): void {
  if (timer === null) return;
  window.clearInterval(timer);
  timer = null;
  step = 0;
}
