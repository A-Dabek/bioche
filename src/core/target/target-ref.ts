import { Target } from './target';
import { Playable } from '../playable';

export class TargetRef implements Target {
  pointTargets(playables: Playable[]): Playable[] {
    return playables.filter(i => i === this.ref);
  }
  constructor(private ref: Playable) { }
}
