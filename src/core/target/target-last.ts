import { Target } from './target';

import { Playable, NullPlayable } from '../playable';

// export class TargetLast implements Target {
//     pointTargets(playables: Playable[]): Playable[] {
//       let _temp = [] as Playable[];
//       const extendBy = this.repeats - playables.length
//       if (extendBy > 0) _temp = _temp.concat(Array(extendBy).fill(1).map(() => new NullPlayable()));
//       _temp = _temp.concat(playables.reverse().slice(0, this.repeats));
//       return _temp;
//     }

//     constructor(private repeats: number = 1) { }
//   }
