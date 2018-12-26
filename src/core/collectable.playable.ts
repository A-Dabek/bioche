import { ReactivePlayable } from './reactive-playable';
import { Behaviour } from './behaviour';
import { CollectBehaviour } from './collect.behaviour';
import { TargetLast } from './target/target-last';
import { TargetFirst } from './target/target-first';
import { Tribe, NullTribe } from './tribe';

export class CollectablePlayable implements ReactivePlayable {
  tribe: Tribe;

  dispatch(): Behaviour[] {
    return [new CollectBehaviour(new TargetLast())];
  }

  react(events: Behaviour[]): Behaviour[] {
    return events;
  }

  constructor(public name: string) {
    this.tribe = NullTribe;
  }
}

export class CollectableFirstPlayable extends CollectablePlayable {
  dispatch(): Behaviour[] {
    return [new CollectBehaviour(new TargetFirst())];
  }
}
