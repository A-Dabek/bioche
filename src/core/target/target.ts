import { Playable } from '../playable';
import { StatefulPlayable } from '../stateful-playable';

export interface Target {
  pointTargets(playables: Playable[]): StatefulPlayable[];
}
