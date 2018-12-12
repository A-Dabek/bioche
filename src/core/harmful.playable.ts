import { ReactivePlayable } from './reactive-playable';
import { CollectableTribe, HarmfulTribe } from './tribe';
import { Behaviour } from './behaviour';
import { CollectBehaviour } from './collect.behaviour';
import { TargetLast, TargetFirst } from './placement.target';
import { RemoveBehaviour } from './remove.behaviour';
import { TargetTribe } from './name.target';

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
