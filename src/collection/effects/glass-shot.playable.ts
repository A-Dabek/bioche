import { StatelessPlayable } from '@/core/stateless-playable';
import { NullTribe, Tribe } from '@/core/tribe';
import { Change } from '@/core/change/change';
import { ChangeActive, ChangeToggleActive } from '@/core/change/change-active';
import { ChangeDurability } from '@/core/change/change-durability';

export class GlassShotPlayable implements StatelessPlayable {
  name: string;
  tribe: Tribe;

  dispatch(): Change[] {
    return [new ChangeActive('kidneys', true)];
  }

  constructor() {
    this.tribe = NullTribe;
    this.name = 'defibrilate';
  }
}
