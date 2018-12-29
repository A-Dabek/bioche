import { OrganPlayable } from './organ-playable';
import { PlayableState } from '@/interface/playable-state';

export class HeartOrgan extends OrganPlayable {
  constructor(state?: PlayableState) {
    super('heart');
    if (state) {
      this.durability = state.durability;
      this.active = state.active;
    }
  }
}
