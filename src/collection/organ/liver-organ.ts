import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {NumberStatefulIconSubState} from '@/interface/stateful-icon-sub-state';
import {GameState} from '@/interface/game-state';
import {HealthUpSubState} from '@/collection/sub-states/health-up.sub-state';

export class LiverOrgan extends OrganPlayable {

  readonly sugar: NumberStatefulIconSubState;
  readonly health: HealthUpSubState;

  getSubStates() {
    return [
      ...super.getSubStates(),
      this.sugar
    ];
  }

  onTurnEnd(gameState: GameState): void {
    super.onTurnEnd(gameState);
    this.health.healUp(gameState);
  }

  constructor(state?: FirebaseStatefulIcon) {
    super("liver", state);
    this.sugar = new NumberStatefulIconSubState('cubes', 'sugar', state ? state.values['sugar'] || 10 : 10);
    this.health = new HealthUpSubState(state ? state.values['health'] : 10);
  }
}
