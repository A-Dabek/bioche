import { ReactivePlayable } from './reactive-playable';
import { Behaviour } from './behaviour';
import { RemoveBehaviour } from './remove.behaviour';
import { TargetTribe } from './target/target-tribe';
import { TargetFirst } from './target/target-first';
import { Tribe, NullTribe } from './tribe';

export class HarmfulPlayable implements ReactivePlayable {
  tribe: Tribe;

  dispatch(): Behaviour[] {
    return [new RemoveBehaviour(new TargetTribe(NullTribe), new TargetFirst())];
  }

  react(events: Behaviour[]): Behaviour[] {
    return events;
  }

  constructor(public name: string) {
    this.tribe = NullTribe;
  }
}
