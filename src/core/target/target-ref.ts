import { Target } from './target';
import { Playable } from '../playable';
import { StatefulPlayable } from '../stateful-playable';

export class TargetRef implements Target {
  pointTargets(playables: StatefulPlayable[]): StatefulPlayable[] {
    return playables.filter(i => i === this.ref);
  }
  constructor(private ref: Playable) {}
}
