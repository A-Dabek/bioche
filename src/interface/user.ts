import { PlayableState } from './playable-state';

export interface User {
  name: string;
  hand: string[];
  state: PlayableState[];
  lastPlay: string;
  challenging: string;
  playing: string;
  winner: string;
  turn: boolean;
  roll: number;
}
