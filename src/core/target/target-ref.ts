import {Target} from './target';
import {Playable} from '../playable';
import {StatefulIcon} from '../stateful-playable';

export class TargetRef implements Target {
  pointTargets(playables: StatefulIcon[]): StatefulIcon[] {
    return playables.filter(i => i === this.ref);
  }
  constructor(private ref: Playable) {}
}
