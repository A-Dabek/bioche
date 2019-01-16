import {StatefulIcon} from '@/core/stateful-icon';
import {GameState} from '@/interface/game-state';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {
  BasicStatefulIconSubState,
  BooleanStatefulIconSubState,
  StatefulIconSubState
} from '@/interface/stateful-icon-sub-state';

export abstract class OrganPlayable extends StatefulIcon {
  readonly health: StatefulIconSubState<number>;
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

  getValues(): { [p: string]: any } {
    return {
      ...super.getValues(),
      health: this.health.getValue(),
      stopped: this.stopped.getValue()
    };
  }

  getPresentation(): {key: string, value: string, className: string}[] {
    const present = super.getPresentation();
    if (this.stopped.getValue()) return present.concat({key: this.stopped.name, value: '', className: 'stop-beating'});
    else {
      return present;
    }
  }

  constructor(name: string, state?: FirebaseStatefulIcon) {
    super(name);
    if (state) {
      this.health = new BasicStatefulIconSubState<number>('health_normal', state.values['health']);
      this.stopped = new BooleanStatefulIconSubState('pause_button', state.values['stopped']);
    }
    else {
      this.health = new BasicStatefulIconSubState<number>('health_normal', 10);
      this.stopped = new BooleanStatefulIconSubState('pause_button', false);
    }
  }
}
