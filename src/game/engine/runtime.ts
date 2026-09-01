import { Vector3 } from 'three';

/* Position visuelle interpolée du joueur : écrite par <Player/>, lue par
   <FollowCamera/>. Délibérément hors de React — c'est une donnée par frame,
   la faire passer par un state provoquerait 60 re-renders par seconde. */
export const playerVisual = new Vector3();
