import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';

export class LiverOrgan extends OrganPlayable {
  constructor(state?: FirebaseStatefulIcon) {
    super("liver");
  }
}
