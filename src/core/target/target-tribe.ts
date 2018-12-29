import { Target } from './target';
import { Playable } from '../playable';
import { Tribe } from '../tribe';
import { StatefulPlayable } from '../stateful-playable';

export class TargetTribe implements Target {
  pointTargets(playables: StatefulPlayable[]): StatefulPlayable[] {
    return playables.filter(i => i.tribe.type === this.tribe.type);
  }

  constructor(private tribe: Tribe) {}
}
