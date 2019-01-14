import {NullPlayable, Playable} from '../playable';
import {StatefulIcon} from '../stateful-playable';

// export class TargetFirst implements Target {
// pointTargets(playables: StatefulPlayable[]): StatefulPlayable[] {
//   let _temp = playables.slice(0, this.repeats);
//   const extendBy = this.repeats - playables.length;
//   if (extendBy > 0)
//     _temp = _temp.concat(
//       Array(extendBy)
//         .fill(1)
//         .map(() => new NullPlayable())
//     );
//   return _temp;
// }

//   constructor(private repeats: number = 1) {}
// }
