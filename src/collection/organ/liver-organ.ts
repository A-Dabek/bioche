import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {BasicStatefulIconSubState, StatefulIconSubState} from '@/interface/stateful-icon-sub-state';

export class LiverOrgan extends OrganPlayable {

  readonly sugar: StatefulIconSubState<number>;

  getSubStates() {
    return [
      ...super.getSubStates(),
      this.sugar
    ];
  }

  getValues(): { [p: string]: any } {
    return {
      ...super.getValues(),
      sugar: this.sugar.getValue()
    };
  }

  constructor(state?: FirebaseStatefulIcon) {
    super("liver");
    if (state) {
      this.sugar = new BasicStatefulIconSubState<number>('cubes', state.values['sugar']);
    }
    else {
      this.sugar = new BasicStatefulIconSubState<number>('cubes', 10);
    }
  }
}
