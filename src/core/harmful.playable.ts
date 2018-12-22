import { ReactivePlayable } from './reactive-playable';
import { CollectableTribe, HarmfulTribe } from './tribe';
import { Behaviour } from './behaviour';
import { RemoveBehaviour } from './remove.behaviour';
import { TargetTribe } from './target/target-tribe';
import { TargetFirst } from './target/target-first';

export class HarmfulPlayable implements ReactivePlayable {
  tribe: HarmfulTribe;

  dispatch(): Behaviour[] {
    return [new RemoveBehaviour(new TargetTribe(new CollectableTribe()), new TargetFirst())]
  }

  react(events: Behaviour[]): Behaviour[] {
    return events;
  }

  constructor(public name: string) {
    this.tribe = new HarmfulTribe();
  }
}
