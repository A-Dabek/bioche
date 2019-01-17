import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';

export class HeartOrgan extends OrganPlayable {

  constructor(state?: FirebaseStatefulIcon) {
    super('heart', state);
  }
}
