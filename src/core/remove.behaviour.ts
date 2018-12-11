import { Behaviour } from './behaviour';
import { Playable } from './playable';
import { Target } from './target';

export class RemoveBehaviour implements Behaviour {

  private targets: Target[];

  process(played: Playable, playables: Playable[]): Playable[] {
    let _temp = playables;
    this.targets.forEach(t => {
      _temp = t.pointTargets(_temp);
      console.log(_temp);
    });
    return playables.filter(i => !_temp.find(j => j === i));
  }

  constructor(...targets: Target[]) { 
    this.targets = targets;
  }
}