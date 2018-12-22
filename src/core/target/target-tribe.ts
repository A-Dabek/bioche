import { Target } from './target';
import { Playable } from '../playable';
import { Tribe } from '../tribe';

export class TargetTribe implements Target {
    pointTargets(playables: Playable[]): Playable[] {
      return playables.filter(i => i.tribe.type === this.tribe.type)
    }
  
    constructor(private tribe: Tribe) { }
  }
  