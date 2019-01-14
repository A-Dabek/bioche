import {RawState} from '@/interface/raw-state';

export interface User {
  name: string;
  hand: string[];
  state: RawState[];
  lastPlay: string;
  challenging: string;
  playing: string;
  winner: string;
  turn: boolean;
  roll: number;
  palette: string;
}
