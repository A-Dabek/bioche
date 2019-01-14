import {StatefulIcon} from '../stateful-playable';
import {PlayableIcon} from '../stateless-playable';

export class Change {
  applyToTargetState(state: StatefulIcon[]): StatefulIcon[] {
    return state;
  }
  applyToHand(hand: PlayableIcon[]): PlayableIcon[] {
    return hand;
  }
  applyToOtherState(state: StatefulIcon[]): StatefulIcon[] {
    return state;
  }
}
