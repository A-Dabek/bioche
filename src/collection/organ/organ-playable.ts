import {StatefulIcon} from '@/core/stateful-icon';
import {GameState} from '@/interface/game-state';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {
  BooleanStatefulIconSubState,
  NumberStatefulIconSubState,
  StatefulIconSubState
} from '@/interface/stateful-icon-sub-state';

export abstract class OrganPlayable extends StatefulIcon {
  readonly health: NumberStatefulIconSubState;
  readonly stopped: StatefulIconSubState<boolean>;

  getSubStates() {
    return [
      ...super.getSubStates(),
      this.health
    ];
  }

  onTurnEnd(gameState: GameState): void {
  }

  onTurnStart(gameState: GameState): void {
  }

  constructor(name: string, state: FirebaseStatefulIcon | undefined) {
    super(name);
    this.health = new NumberStatefulIconSubState('health_normal', 'health', state ? state.values['health'] : 10);
    console.log(name, state ? state.values : 'no state');
    this.stopped = new BooleanStatefulIconSubState('pause_button', 'stopped', state ? state.values['stopped'] : false);
  }
}
