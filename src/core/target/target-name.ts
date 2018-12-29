import { Target } from './target';
import { StatefulPlayable } from '../stateful-playable';

export class TargetName implements Target {
  pointTargets(playables: StatefulPlayable[]): StatefulPlayable[] {
    return playables.filter(i => i.name === this.name);
  }

  constructor(private name: string) {}
}
