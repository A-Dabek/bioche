import { OrganTribe } from './organ.tribe';
import { Tribe } from '@/core/tribe';
import { Behaviour } from '@/core/behaviour';
import { StatefulPlayable } from '@/core/stateful-playable';
import { PlayableState } from '@/interface/playable-state';

export abstract class OrganPlayable implements StatefulPlayable {
  durability: number;
  active: boolean;
  tribe: Tribe;

  getState(): PlayableState {
    return {
      durability: this.durability,
      active: this.active,
      name: this.name
    };
  }

  dispatch(): Behaviour[] {
    return [];
  }

  react(events: Behaviour[]): Behaviour[] {
    return events;
  }

  constructor(public name: string) {
    this.tribe = OrganTribe;
    this.durability = 10;
    this.active = true;
  }
}
