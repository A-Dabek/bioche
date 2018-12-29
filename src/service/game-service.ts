import { ReactivePlayable } from '@/core/reactive-playable';
import { Playable } from '@/core/playable';
import { BowelsOrgan } from '@/collection/organ/bowels-organ';
import { KidneysOrgan } from '@/collection/organ/kidneys-organ';
import { LiverOrgan } from '@/collection/organ/liver-organ';
import { BrainOrgan } from '@/collection/organ/brain-organ';
import { HeartOrgan } from '@/collection/organ/heart-organ';
import { LungsOrgan } from '@/collection/organ/lungs-organ';
import { StomachOrgan } from '@/collection/organ/stomach-organ';
import { OrganTribe } from '@/collection/organ/organ.tribe';
import { DefibrilateEffect } from '@/collection/effects/defibrilate.playable';
import { PlayableState } from '@/interface/playable-state';
import { StatefulPlayable } from '@/core/stateful-playable';

export class GameService {
  private static instance: GameService;
  private statefulLibrary: {
    [k: string]: (state: PlayableState) => StatefulPlayable;
  };
  private statelessLibrary: {
    [k: string]: () => ReactivePlayable;
  };

  play(p: string, states: PlayableState[]): PlayableState[] {
    const played = this.statelessLibrary[p]();
    return this.eventHandler(
      played,
      states.map(i => this.statefulLibrary[i.name](i))
    );
  }

  getRandomIcon(): string {
    const keys = Object.keys(this.statelessLibrary);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  isWinConditionMet(state: PlayableState[]): boolean {
    return state.every(i => i.durability <= 0);
  }

  static getInstance(): GameService {
    if (!GameService.instance) GameService.instance = new GameService();
    return GameService.instance;
  }

  private eventHandler(
    played: ReactivePlayable,
    state: StatefulPlayable[]
  ): PlayableState[] {
    let events = played.dispatch();
    let newState: StatefulPlayable[] = [...state];
    state.forEach(h => (events = h.react(events)));
    events.forEach(ev => (newState = ev.process(played, newState)));
    return newState.map(i => i.getState());
  }

  private constructor() {
    this.statelessLibrary = {
      defibrilate: () => new DefibrilateEffect()
    };
    this.statefulLibrary = {
      heart: state => new HeartOrgan(state)
    };
    // bowels: () => new BowelsOrgan(),
    // brain: () => new BrainOrgan(),
    // kidneys: () => new KidneysOrgan(),
    // liver: () => new LiverOrgan(),
    // lungs: () => new LungsOrgan(),
    // stomach: () => new StomachOrgan()
    Object.keys(this.statefulLibrary)
      .concat(Object.keys(this.statelessLibrary))
      .forEach(key => {
        if (
          this.statefulLibrary[key] == null &&
          this.statelessLibrary[key] == null
        )
          throw new Error(`library invalid for /${key}/`);
      });
  }
}
