import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';

export class StomachOrgan extends OrganPlayable {
  constructor(state?: FirebaseStatefulIcon) {
    super("stomach", state);
  }
}
