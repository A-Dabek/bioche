import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {BasicStatefulIconSubState, StatefulIconSubState} from '@/interface/stateful-icon-sub-state';

export class KidneysOrgan extends OrganPlayable {

  readonly water: StatefulIconSubState<number>;

  getSubStates() {
    return [
      ...super.getSubStates(),
      this.water
    ];
  }

  constructor(state?: FirebaseStatefulIcon) {
    super('kidneys', state);
    if (state) {
      this.water = new BasicStatefulIconSubState<number>('droplets', 'water', state.values['water'] || 10);
    }
    else {
      this.water = new BasicStatefulIconSubState<number>('droplets', 'water', 10);
    }
  }
}
