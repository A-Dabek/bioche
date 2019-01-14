import {Target} from './target';
import {StatefulIcon} from '../stateful-playable';

export class TargetName implements Target {
  pointTargets(playables: StatefulIcon[]): StatefulIcon[] {
    return playables.filter(i => i.name === this.name);
  }

  constructor(private name: string) {}
}
