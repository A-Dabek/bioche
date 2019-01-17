import {KidneysOrgan} from '@/collection/organ/kidneys-organ';
import {BrainOrgan} from '@/collection/organ/brain-organ';
import {HeartOrgan} from '@/collection/organ/heart-organ';
import {DefibrilateEffect} from '@/collection/effects/defibrilate.playable';
import {GlassShotPlayable} from '@/collection/effects/glass-shot.playable';
import {StatefulIcon} from '@/core/stateful-icon';
import {PlayableIcon} from '@/core/playable-icon';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {LungsOrgan} from '@/collection/organ/lungs-organ';
import {BowelsOrgan} from '@/collection/organ/bowels-organ';
import {LiverOrgan} from '@/collection/organ/liver-organ';
import {StomachOrgan} from '@/collection/organ/stomach-organ';
import {GameState} from '@/interface/game-state';

export class GameService {
  private static instance: GameService;
  readonly statefulLibrary: {
    [k: string]: (state?: FirebaseStatefulIcon) => StatefulIcon;
  };
  readonly statelessLibrary: { [k: string]: () => PlayableIcon };

  play(playedIndex: number, hand: string[], userState: FirebaseStatefulIcon[], enemyState: FirebaseStatefulIcon[], targetMyself: boolean): GameState {
    const gameState: GameState = {
      hand: hand.filter((i, index) => index !== playedIndex),
      state: userState.map(i => this.statefulLibrary[i.name](i)),
      get targetState() {
        return targetMyself ? gameState.state : gameState.enemyState;
      },
      enemyState: enemyState.map(i => this.statefulLibrary[i.name](i))
    };
    this.eventHandler(gameState, this.statelessLibrary[hand[playedIndex]]());
    return gameState;
  }

  endTurn(gameState: GameState): void {
    gameState.hand.push(
      this.getRandomIcon()
    );
    // let newState: StatefulIcon[] = gameState.state.map(i =>
    //   this.statefulLibrary[i.name](i)
    // );
    // let events = [] as Change[];
    // newState.forEach(h => h.onTurnEnd());
    // events.forEach(ev => (newState = ev.applyToTargetState(newState)));
    // return newState.map(i => i.getState());
  }

  getRandomIcon(): string {
    const keys = Object.keys(this.statelessLibrary);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  isWinConditionMet(state: GameState): boolean {
    return false;//state.every(i => i.durability <= 0);
  }

  startingState(): FirebaseStatefulIcon[] {
    return [
      // this.statefulLibrary.brain(),
      this.statefulLibrary.heart(),
      // this.statefulLibrary.lungs(),
      // this.statefulLibrary.stomach(),
      // this.statefulLibrary.bowels(),
      this.statefulLibrary.liver(),
      this.statefulLibrary.kidneys(),
    ].map(i => i.getState())
  }

  static getInstance(): GameService {
    if (!GameService.instance) GameService.instance = new GameService();
    return GameService.instance;
  }

  private eventHandler(
    gameState: GameState,
    played: PlayableIcon
  ): void {
    played.applyEffect(gameState);
  }

  private constructor() {
    this.statelessLibrary = {
      defibrilate: () => new DefibrilateEffect(),
      glass_shot: () => new GlassShotPlayable()
    };
    this.statefulLibrary = {
      heart: state => new HeartOrgan(state),
      brain: state => new BrainOrgan(state),
      kidneys: state => new KidneysOrgan(state),
      lungs: state => new LungsOrgan(state),
      bowels: state => new BowelsOrgan(state),
      liver: state => new LiverOrgan(state),
      stomach: state => new StomachOrgan(state)
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
