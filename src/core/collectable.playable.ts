import { ReactivePlayable } from './reactive-playable';
import { CollectableTribe } from './tribe';
import { Behaviour } from './behaviour';
import { CollectBehaviour } from './collect.behaviour';
import { TargetLast, TargetFirst } from './placement.target';

export class CollectablePlayable implements ReactivePlayable {
  tribe: CollectableTribe;

  dispatch(): Behaviour[] {
    return [new CollectBehaviour(new TargetLast())]
  }

  react(events: Behaviour[]): Behaviour[] {
    return events;
  }

  constructor(public name: string) {
    this.tribe = new CollectableTribe();
  }
}

export class CollectableFirstPlayable extends CollectablePlayable {
  dispatch(): Behaviour[] {
    return [new CollectBehaviour(new TargetFirst())]
  }
}
