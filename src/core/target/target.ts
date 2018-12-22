import { Playable } from '../playable';

export interface Target {
  pointTargets(playables: Playable[]): Playable[]
}
