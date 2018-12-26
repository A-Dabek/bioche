import { ReactivePlayable } from './reactive-playable';
import { Behaviour } from './behaviour';
import { CollectBehaviour } from './collect.behaviour';
import { RemoveBehaviour } from './remove.behaviour';
import { TargetFirst } from './target/target-first';
import { TargetRef } from './target/target-ref';
import { Tribe, NullTribe } from './tribe';

export class ProtectivePlayable implements ReactivePlayable {
  tribe: Tribe;

  dispatch(): Behaviour[] {
    return [new CollectBehaviour(new TargetFirst())];
  }

  react(events: Behaviour[]): Behaviour[] {
    const removeEvents = events.filter(i => i instanceof RemoveBehaviour);
    removeEvents.forEach(re => {
      events = events.filter(i => i !== re);
      events.push(new RemoveBehaviour(new TargetRef(this)));
    });
    return events;
  }

  constructor(public name: string) {
    this.tribe = NullTribe;
  }
}
