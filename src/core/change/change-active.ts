import { Change } from './change';
import { StatefulPlayable } from '../stateful-playable';

export class ChangeActive extends Change {
  applyToTargetState(state: StatefulPlayable[]): StatefulPlayable[] {
    const heart = state.find(i => i.name === this.name);
    if (heart) {
      heart.active = this.active;
    }
    return state;
  }

  constructor(private name: string, private active: boolean) {
    super();
  }
}

export class ChangeToggleActive extends Change {
  applyToTargetState(state: StatefulPlayable[]): StatefulPlayable[] {
    const heart = state.find(i => i.name === this.name);
    if (heart) {
      heart.active = !heart.active;
    }
    return state;
  }

  constructor(private name: string) {
    super();
  }
}
