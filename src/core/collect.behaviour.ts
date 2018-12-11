import { Behaviour } from './behaviour';
import { Target } from './target';
import { Playable, NullPlayable } from './playable';

export class CollectBehaviour implements Behaviour {
  
  process(played: Playable, playables: Playable[]): Playable[] {
    this.placement
    .pointTargets([...playables, new NullPlayable()])
    .forEach(t => {
      const index = playables.indexOf(t);
      if (index === -1) playables.push(played);
      else playables.splice(index, 0, played);
    })
    return playables;
  }
  
  constructor(private placement: Target) { }
}