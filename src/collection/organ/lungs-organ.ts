import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';

export class LungsOrgan extends OrganPlayable {
  constructor(state?: FirebaseStatefulIcon) {
    super("lungs", state);
  }
}
