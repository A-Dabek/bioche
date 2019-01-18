import {KidneysOrgan} from '@/collection/organ/kidneys-organ';
import {BrainOrgan} from '@/collection/organ/brain-organ';
import {HeartOrgan} from '@/collection/organ/heart-organ';
import {GlassShotPlayable} from '@/collection/food/glass-shot.playable';
import {StatefulIcon} from '@/core/stateful-icon';
import {PlayableIcon} from '@/core/playable-icon';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {LungsOrgan} from '@/collection/organ/lungs-organ';
import {BowelsOrgan} from '@/collection/organ/bowels-organ';
import {LiverOrgan} from '@/collection/organ/liver-organ';
import {StomachOrgan} from '@/collection/organ/stomach-organ';
import {GameState} from '@/interface/game-state';
import {PillPlayable} from '@/collection/effects/pill.playable';
import {MedicinePillsPlayable} from '@/collection/effects/medicine-pills.playable';
import {DefibrilateEffect} from '@/collection/effects/defibrilate.playable';
import {BerriesPlayable} from '@/collection/food/berries.playable';
import {ChocolatePlayable} from '@/collection/food/chocolate.playable';
import {CookiePlayable} from '@/collection/food/cookie.playable';
import {CakePlayable} from '@/collection/food/cake.playable';
import {CheesePlayable} from '@/collection/food/cheese.playable';
import {OrangePlayable} from '@/collection/food/orange.playable';
import {MeatPlayable} from '@/collection/food/meat.playable';
import {FishPlayable} from '@/collection/food/fish.playable';
import {WatermelonPlayable} from '@/collection/food/watermelon.playable';
import {BreadPlayable} from '@/collection/food/bread.playable';

export class GameService {
  private static instance: GameService;
  readonly statefulLibrary: { [k: string] : (state?: FirebaseStatefulIcon) => StatefulIcon };
  readonly statelessLibrary: { [k: string]: () => PlayableIcon };

  static getInstance(): GameService {
    if (!GameService.instance) GameService.instance = new GameService();
    return GameService.instance;
  }

  startingState(): FirebaseStatefulIcon[] {
    return [
      // this.statefulLibrary.brain(),
      // this.statefulLibrary.heart(),
      // this.statefulLibrary.lungs(),
      // this.statefulLibrary.stomach(),
      // this.statefulLibrary.bowels(),
      this.statefulLibrary.liver(),
      this.statefulLibrary.kidneys(),
    ].map(i => i.getState())
  }

  isWinConditionMet(state: GameState): boolean {
    return false;//state.every(i => i.durability <= 0);
  }

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

  private eventHandler(
    gameState: GameState,
    played: PlayableIcon
  ): void {
    played.applyEffect(gameState);
  }

  endTurn(gameState: GameState): void {
    gameState.hand.push(
      this.getRandomIcon()
    );
    gameState.state.forEach(s => s.onTurnEnd(gameState));
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

  private constructor() {
    this.statelessLibrary = {
      //food
      chocolate: () => new ChocolatePlayable(),
      cookie: () => new CookiePlayable(),
      cake: () => new CakePlayable(),
      cheese: () => new CheesePlayable(),
      bread: () => new BreadPlayable(),
      meat: () => new MeatPlayable(),
      orange: () => new OrangePlayable(),
      fish: () => new FishPlayable(),
      berries: () => new BerriesPlayable(),
      watermelon: () => new WatermelonPlayable(),
      glass_shot: () => new GlassShotPlayable(),
      // other
      defibrilate: () => new DefibrilateEffect(),
      // medicine
      pill: () => new PillPlayable(),
      medicine_pills: () => new MedicinePillsPlayable()
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
