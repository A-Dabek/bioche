import { Target } from './target';
import { Playable } from '../playable';

export class TargetName implements Target {
    pointTargets(playables: Playable[]): Playable[] {
      return playables.filter(i => i.name === this.name)
    }
  
    constructor(private name: string) { }
  }