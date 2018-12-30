import { Change } from './change';
import { StatefulPlayable } from '../stateful-playable';

export class ChangeDurability extends Change {
  applyToTargetState(state: StatefulPlayable[]): StatefulPlayable[] {
    const heart = state.find(i => i.name === this.name);
    if (heart) {
      heart.durability += this.value;
    }
    return state;
  }

  constructor(private name: string, private value: number) {
    super();
  }
}

export class ChangeSetDurability extends Change {
  applyToTargetState(state: StatefulPlayable[]): StatefulPlayable[] {
    const heart = state.find(i => i.name === this.name);
    if (heart) {
      heart.durability = this.value;
    }
    return state;
  }

  constructor(private name: string, private value: number) {
    super();
  }
}
