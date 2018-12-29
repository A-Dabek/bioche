import { Target } from './target';
import { Playable, NullPlayable } from '../playable';
import { StatefulPlayable } from '../stateful-playable';

export class TargetRandom implements Target {
  private shuffle(array: any[]) {
    let j, x, i;
    array = [...array];
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  pointTargets(playables: StatefulPlayable[]): StatefulPlayable[] {
    let _temp = this.shuffle(playables).slice(0, this.repeats);
    const extendBy = this.repeats - playables.length;
    if (extendBy > 0)
      _temp = _temp.concat(
        Array(extendBy)
          .fill(1)
          .map(() => new NullPlayable())
      );
    return _temp;
  }

  constructor(private repeats: number = 1) {}
}
