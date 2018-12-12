
import { Tribe } from './tribe';
import { Playable } from './playable';
import { Behaviour } from './behaviour';

export interface ReactivePlayable extends Playable {
  dispatch(): Behaviour[];
  react(events: Behaviour[]): Behaviour[];
}
