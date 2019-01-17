import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';

export class BowelsOrgan extends OrganPlayable {
  constructor(state?: FirebaseStatefulIcon) {
    super('bowels', state);
  }
}
