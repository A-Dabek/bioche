import {Target} from './target';
import {Playable} from '../playable';
import {Tribe} from '../tribe';
import {StatefulIcon} from '../stateful-playable';

export class TargetTribe implements Target {
  pointTargets(playables: StatefulIcon[]): StatefulIcon[] {
    return playables;//.filter(i => i.tribe.type === this.tribe.type);
  }

  constructor(private tribe: Tribe) {}
}
