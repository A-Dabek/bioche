import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/raw-state';

export class BowelsOrgan extends OrganPlayable {
  constructor(state?: FirebaseStatefulIcon) {
    super('bowels', state);
  }
}
