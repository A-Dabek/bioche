import { OrganPlayable } from './organ-playable';
import { FirebaseStatefulIcon } from '@/interface/firebase-stateful-icon';
import { Description } from '@/core/description/description';

export class HeartOrgan extends OrganPlayable {
  getDescription(): Description[] {
    return [
      ...super.getDescription(),
      {
        code:
          'Jeśli ma status {{pause_button}} to wszystkie organy tracą {{health_normal}}'
      }
    ];
  }

  constructor(state?: FirebaseStatefulIcon) {
    super('heart', state);
  }
}
