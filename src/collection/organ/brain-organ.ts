import { OrganPlayable } from './organ-playable';
import { PlayableState } from '@/interface/playable-state';

export class BrainOrgan extends OrganPlayable {
  constructor(state?: PlayableState) {
    super('brain');
    if (state) {
      this.durability = state.durability;
      this.active = state.active;
    }
  }
}
