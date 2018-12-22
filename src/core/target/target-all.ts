import { Target } from './target';
import { Playable } from '../playable';

export class TargetAll implements Target {
    pointTargets(playables: Playable[]): Playable[] {
      if (this.reversed) return playables.reverse()
      return playables;
    }
  
    constructor(private reversed: boolean = false) { }
  }