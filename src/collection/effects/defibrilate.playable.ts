import { ReactivePlayable } from '@/core/reactive-playable';
import { NullTribe, Tribe } from '@/core/tribe';
import { Behaviour } from '@/core/behaviour';

export class DefibrilateEffect implements ReactivePlayable {
  name: string;
  tribe: Tribe;

  dispatch(): Behaviour[] {
    return [
      {
        process: (played, states) => {
          const heart = states.find(i => i.name === 'heart');
          if (heart) {
            heart.durability -= 1;
            heart.active = !heart.active;
          }
          return states;
        }
      }
    ];
  }

  react(events: Behaviour[]): Behaviour[] {
    return events;
  }

  constructor() {
    this.tribe = NullTribe;
    this.name = 'defibrilate';
  }
}
