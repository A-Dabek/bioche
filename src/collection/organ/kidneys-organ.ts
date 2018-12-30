import { OrganPlayable } from './organ-playable';
import { PlayableState } from '@/interface/playable-state';

export class KidneysOrgan extends OrganPlayable {
  constructor(state?: PlayableState) {
    super('kidneys');
    this.active = false;
    if (state) {
      this.durability = state.durability;
      this.active = state.active;
    }
  }
}
