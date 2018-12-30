import { StatefulPlayable } from '../stateful-playable';
import { StatelessPlayable } from '../stateless-playable';

export class Change {
  applyToTargetState(state: StatefulPlayable[]): StatefulPlayable[] {
    return state;
  }
  applyToHand(hand: StatelessPlayable[]): StatelessPlayable[] {
    return hand;
  }
  applyToOtherState(state: StatefulPlayable[]): StatefulPlayable[] {
    return state;
  }
}
