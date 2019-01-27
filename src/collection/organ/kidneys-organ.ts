import { OrganPlayable } from './organ-playable';
import { FirebaseStatefulIcon } from '@/interface/firebase-stateful-icon';
import { NumberStatefulIconSubState } from '@/interface/stateful-icon-sub-state';
import { GameState } from '@/interface/game-state';
import { PlayableUtils } from '@/collection/playable-utils';
import { BowelsOrgan } from '@/collection/organ/bowels-organ';
import { Description } from '@/core/description/description';

class WaterStatefulIconSubState extends NumberStatefulIconSubState {
  changeValueBy(gameState: GameState, changeBy: number): void {
    if (changeBy > 0) {
      const bowels = PlayableUtils.findConcrete<BowelsOrgan>(
        'bowels',
        gameState.targetState
      );
      if (bowels && !bowels.stopped.getValue()) {
        changeBy *= 2;
      }
    }
    super.changeValueBy(gameState, changeBy);
  }
}

export class KidneysOrgan extends OrganPlayable {
  readonly water: NumberStatefulIconSubState;

  getDescription(): Description[] {
    return [
      ...super.getDescription(),
      {
        code:
          'Regulują poziom {{droplets}} jej brak obniża {{health_normal}} wszystkich organów'
      }
    ];
  }

  getSubStates() {
    return [...super.getSubStates(), this.water];
  }

  constructor(state?: FirebaseStatefulIcon) {
    super('kidneys', state);
    this.water = new WaterStatefulIconSubState(
      'droplets',
      'water',
      state ? state.values['water'] : 10
    );
  }
}
