import { Tribe, NullTribe } from './tribe';

export interface Playable {
  name: string;
  tribe: Tribe;
}

export class NullPlayable implements Playable {
  name = '__null';
  tribe = NullTribe;
}