import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';

export interface FirebaseUser {
  name: string;
  hand: string[];
  state: FirebaseStatefulIcon[];
  lastPlay: string;
  challenging: string;
  playing: string;
  winner: string;
  turn: boolean;
  roll: number;
  palette: string;
}
