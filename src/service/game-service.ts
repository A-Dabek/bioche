import {KidneysOrgan} from '@/collection/organ/kidneys-organ';
import {BrainOrgan} from '@/collection/organ/brain-organ';
import {HeartOrgan} from '@/collection/organ/heart-organ';
import {DefibrilateEffect} from '@/collection/effects/defibrilate.playable';
import {GlassShotPlayable} from '@/collection/effects/glass-shot.playable';
import {StatefulIcon} from '@/core/stateful-icon';
import {PlayableIcon} from '@/core/playable-icon';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';

export class GameService {
  private static instance: GameService;
  readonly statefulLibrary: {
    [k: string]: (state?: FirebaseStatefulIcon) => StatefulIcon;
  };
  readonly statelessLibrary: { [k: string]: () => PlayableIcon };

  play(p: string, states: any[]): any[] {
    const played = this.statelessLibrary[p]();
    return this.eventHandler(
      played,
      states.map(i => this.statefulLibrary[i.name](i))
    );
  }

  endTurn(state: any[]): any[] {
    let newState: StatefulIcon[] = state.map(i =>
      this.statefulLibrary[i.name](i)
    );
    // let events = [] as Change[];
    // newState.forEach(h => h.onTurnEnd());
    // events.forEach(ev => (newState = ev.applyToTargetState(newState)));
    return newState.map(i => i.getState());
  }

  getRandomIcon(): string {
    const keys = Object.keys(this.statelessLibrary);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  isWinConditionMet(state: any[]): boolean {
    return false;//state.every(i => i.durability <= 0);
  }

  startingState(): FirebaseStatefulIcon[] {
    return [
      this.statefulLibrary.brain(),
      this.statefulLibrary.heart(),
      this.statefulLibrary.kidneys(),
    ].map(i => i.getState())
  }

  static getInstance(): GameService {
    if (!GameService.instance) GameService.instance = new GameService();
    return GameService.instance;
  }

  private eventHandler(
    played: PlayableIcon,
    state: StatefulIcon[]
  ): any[] {
    played.applyEffect({
      targetState: state,
      hand: [],
      state: [],
      enemyState: []
    });
    return state.map(i => i.getState());
  }

  private constructor() {
    this.statelessLibrary = {
      defibrilate: () => new DefibrilateEffect(),
      glass_shot: () => new GlassShotPlayable()
    };
    this.statefulLibrary = {
      heart: state => new HeartOrgan(state),
      brain: state => new BrainOrgan(state),
      kidneys: state => new KidneysOrgan(state)
    };
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
