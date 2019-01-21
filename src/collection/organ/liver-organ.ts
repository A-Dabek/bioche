import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {NumberStatefulIconSubState} from '@/interface/stateful-icon-sub-state';
import {GameState} from '@/interface/game-state';
import {HealthUpSubState} from '@/collection/sub-states/health-up.sub-state';
import {PlayableUtils} from '@/collection/playable-utils';
import {BowelsOrgan} from '@/collection/organ/bowels-organ';
import {StomachOrgan} from '@/collection/organ/stomach-organ';

class SugarStatefulIconSubState extends NumberStatefulIconSubState {

  changeValueBy(gameState: GameState, changeBy: number): void {
    if (changeBy > 0) {
      const bowels = PlayableUtils.findConcrete<BowelsOrgan>('bowels', gameState.targetState);
      if (bowels && !bowels.stopped.getValue()) {
        changeBy *= 2;
      }
      const stomach = PlayableUtils.findConcrete<StomachOrgan>('stomach', gameState.targetState);
      if (stomach && !stomach.stopped.getValue()) {
        changeBy *= 2;
      }
    }
    super.changeValueBy(gameState, changeBy);
  }
}

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
    this.sugar = new SugarStatefulIconSubState('cubes', 'sugar', state ? state.values['sugar'] || 10 : 10);
    this.health = new HealthUpSubState(state ? state.values['health'] : 10);
  }
}
