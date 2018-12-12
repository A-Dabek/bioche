import { ReactivePlayable } from '@/core/reactive-playable';
import { Playable } from '@/core/playable';
import { CollectBehaviour } from '@/core/collect.behaviour';
import { CollectablePlayable, CollectableFirstPlayable } from '@/core/collectable.playable';
import { HarmfulPlayable } from '@/core/harmful.playable';
import { ProtectivePlayable } from '@/core/protective.playable';

export class GameService {
  private static instance: GameService;
  private library: {[k: string]: () => ReactivePlayable};
  
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
  
  private eventHandler(played: ReactivePlayable, state: ReactivePlayable[]): Playable[] {
    let events = played.dispatch();
    let newState: Playable[] = [...state];
    state.forEach(h => events = h.react(events));
    events.forEach(ev => newState = ev.process(played, newState));
    return newState;
  }

  private constructor() {
    this.library = {
      'bowels': () => new CollectablePlayable('bowels'),
      'kidneys': () => new CollectablePlayable('kidneys'),
      'liver': () => new CollectableFirstPlayable('liver'),
      'wine_bottle': () => new HarmfulPlayable('wine_bottle'),
      'american_football_helmet': () => new ProtectivePlayable('american_football_helmet')
    };
  }
}
