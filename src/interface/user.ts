import { Playable } from '@/core/playable';

export interface User {
  name: string;
  hand: string[];
  state: string[];
  challenging: string;
  winner: boolean;
}
