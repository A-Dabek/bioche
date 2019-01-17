import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {NumberStatefulIconSubState,} from '@/interface/stateful-icon-sub-state';

export class KidneysOrgan extends OrganPlayable {

  readonly water: NumberStatefulIconSubState;

  getSubStates() {
    return [
      ...super.getSubStates(),
      this.water
    ];
  }

  constructor(state?: FirebaseStatefulIcon) {
    super('kidneys', state);
    this.water = new NumberStatefulIconSubState('droplets', 'water', state ? state.values['water'] : 10);
  }
}
