import { OrganTribe } from "./organ.tribe";
import { Tribe } from "@/core/tribe";
import { ReactivePlayable } from "@/core/reactive-playable";
import { Behaviour } from "@/core/behaviour";
import { CollectBehaviour } from "@/core/collect.behaviour";
import { TargetLast } from "@/core/target/target-last";

export abstract class OrganPlayable implements ReactivePlayable {
  tribe: Tribe;

  dispatch(): Behaviour[] {
    return [new CollectBehaviour(new TargetLast())];
  }

  react(events: Behaviour[]): Behaviour[] {
    return events;
  }

  constructor(public name: string) {
    this.tribe = OrganTribe;
  }
}
