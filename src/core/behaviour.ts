import { Playable } from './playable';

export interface Behaviour {
  process(played: Playable, playables: Playable[]): Playable[];
}
