import { OrganPlayable } from './organ-playable';
import { FirebaseStatefulIcon } from '@/interface/firebase-stateful-icon';
import { Description } from '@/core/description/description';

export class BrainOrgan extends OrganPlayable {
  getDescription(): Description[] {
    return [
      ...super.getDescription(),
      { code: 'Jego śmierć oznacza przegraną' }
    ];
  }

  constructor(state?: FirebaseStatefulIcon) {
    super('brain', state);
  }
}
