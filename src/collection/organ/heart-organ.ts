import { OrganPlayable } from './organ-playable';
import { PlayableState } from '@/interface/playable-state';
import { Change } from '@/core/change/change';
import { ChangeDurability } from '@/core/change/change-durability';

export class HeartOrgan extends OrganPlayable {
  onTurnEnd(): Change[] {
    if (!this.active) {
      return [new ChangeDurability('brain', -1)];
    }
    return [];
  }

  constructor(state?: PlayableState) {
    super('heart');
    if (state) {
      this.durability = state.durability;
      this.active = state.active;
    }
  }
}
