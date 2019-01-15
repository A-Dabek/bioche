import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';

export class BrainOrgan extends OrganPlayable {
  constructor(state?: FirebaseStatefulIcon) {
    super('brain', state);
  }
}
