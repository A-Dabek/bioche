import {Playable} from '../playable';
import {StatefulIcon} from '../stateful-playable';

export interface Target {
  pointTargets(playables: Playable[]): StatefulIcon[];
}
