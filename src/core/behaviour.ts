import { Playable } from './playable';
import { StatefulPlayable } from './stateful-playable';

export interface Behaviour {
  process(played: Playable, playables: StatefulPlayable[]): StatefulPlayable[];
}
