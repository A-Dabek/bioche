import { OrganTribe } from './organ.tribe';
import { Tribe } from '@/core/tribe';
import { StatefulPlayable } from '@/core/stateful-playable';
import { PlayableState } from '@/interface/playable-state';
import { Change } from '@/core/change/change';

export abstract class OrganPlayable implements StatefulPlayable {
  _durability: number;
  _active: boolean;
  tribe: Tribe;

  get durability(): number {
    return this._durability;
  }

  set durability(v: number) {
    if (v < 0) {
      this._durability = 0;
    } else {
      this._durability = v;
    }
  }

  get active(): boolean {
    if (this.durability <= 0) return false;
    return this._active;
  }

  set active(v: boolean) {
    this._active = v;
  }

  getState(): PlayableState {
    return {
      durability: this.durability,
      active: this.active,
      name: this.name
    };
  }

  react(events: Change[]): Change[] {
    return events;
  }

  onTurnStart(): Change[] {
    return [];
  }

  onTurnEnd(): Change[] {
    return [];
  }

  constructor(public name: string) {
    this.tribe = OrganTribe;
    this._durability = 10;
    this._active = true;
  }
}
