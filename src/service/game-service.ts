import { ReactivePlayable } from "@/core/reactive-playable";
import { Playable } from "@/core/playable";
import { BowelsOrgan } from '@/collection/organ/bowels-organ';
import { KidneysOrgan } from '@/collection/organ/kidneys-organ';
import { LiverOrgan } from '@/collection/organ/liver-organ';
import { BrainOrgan } from '@/collection/organ/brain-organ';
import { HeartOrgan } from '@/collection/organ/heart-organ';
import { LungsOrgan } from '@/collection/organ/lungs-organ';
import { StomachOrgan } from '@/collection/organ/stomach-organ';

export class GameService {
  private static instance: GameService;
  private library: { [k: string]: () => ReactivePlayable };

  play(p: string, state: string[]): Playable[] {
    const played = this.getPlayable(p);
    return this.eventHandler(played, state.map(i => this.getPlayable(i)));
  }

  static getInstance(): GameService {
    if (!GameService.instance) GameService.instance = new GameService();
    return GameService.instance;
  }

  private getPlayable(name: string): ReactivePlayable {
    return this.library[name]();
  }

  private eventHandler(
    played: ReactivePlayable,
    state: ReactivePlayable[]
  ): Playable[] {
    let events = played.dispatch();
    let newState: Playable[] = [...state];
    state.forEach(h => (events = h.react(events)));
    events.forEach(ev => (newState = ev.process(played, newState)));
    return newState;
  }

  private constructor() {
    this.library = {
      bowels: () => new BowelsOrgan(),
      brain: () => new BrainOrgan(),
      haert: () => new HeartOrgan(),
      kidneys: () => new KidneysOrgan(),
      liver: () => new LiverOrgan(),
      lungs: () => new LungsOrgan(),
      stomach: () => new StomachOrgan()
    };
  }
}
