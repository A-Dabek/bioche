import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {NumberStatefulIconSubState, StatefulIconSubState} from '@/interface/stateful-icon-sub-state';
import {GameState} from '@/interface/game-state';

export class LiverOrgan extends OrganPlayable {

  readonly sugar: StatefulIconSubState<number>;
  // readonly health: NumberStatefulIconSubState;

  getSubStates() {
    return [
      ...super.getSubStates(),
      this.sugar
    ];
  }

  onTurnEnd(gameState: GameState): void {
    super.onTurnEnd(gameState);
    this.health.changeValueBy(gameState, 1);
  }

  constructor(state?: FirebaseStatefulIcon) {
    super("liver", state);
    this.sugar = new NumberStatefulIconSubState('cubes', 'sugar', state ? state.values['sugar'] || 10 : 10);
    // this.health = new NumberStatefulIconSubState('health_up', 'health', state ? state.values['health'] : 10);
  }
}
