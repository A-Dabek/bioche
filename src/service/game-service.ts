import {KidneysOrgan} from '@/collection/organ/kidneys-organ';
import {BrainOrgan} from '@/collection/organ/brain-organ';
import {HeartOrgan} from '@/collection/organ/heart-organ';
import {StatefulIcon} from '@/core/stateful-icon';
import {PlayableIcon} from '@/core/playable-icon';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {LungsOrgan} from '@/collection/organ/lungs-organ';
import {BowelsOrgan} from '@/collection/organ/bowels-organ';
import {LiverOrgan} from '@/collection/organ/liver-organ';
import {StomachOrgan} from '@/collection/organ/stomach-organ';
import {GameState} from '@/interface/game-state';
import {DefibrilateEffect} from '@/collection/effects/defibrilate.playable';
import {RatPlayable} from '@/collection/bacteria/rat.playable';
import {TickPlayable} from '@/collection/bacteria/tick.playable';
import {CatPlayable} from '@/collection/parasite/cat.playable';
import {MosquitoPlayable} from '@/collection/parasite/mosquito.playable';
import {BirdPlayable} from '@/collection/virus/bird.playable';
import {FangsPlayable} from '@/collection/virus/fangs.playable';

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
      this.statefulLibrary.brain(),
      this.statefulLibrary.heart(),
      this.statefulLibrary.lungs(),
      this.statefulLibrary.stomach(),
      this.statefulLibrary.bowels(),
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
      //food-supply
      berry_bush: () => new BerryBushPlayable(),
      covered_jar: () => new CoveredJarPlayable(),
      fish_smoking: () => new FishSmokingPlayable(),
      fruit_bowl: () => new FruitBowlPlayable(),
      fruit_tree: () => new FruitTreePlayable(),
      hot_meal: () => new HotMealPlayable(),
      vending_machine: () => new VendingMachinePlayable(),
      water_bottle: () => new WaterBottlePlayable(),
      // other
      defibrilate: () => new DefibrilateEffect(),
      // bacteria
      rat: () => new RatPlayable(),
      tick: () => new TickPlayable(),
      // virus
      bird: () => new BirdPlayable(),
      fangs: () => new FangsPlayable(),
      // parasite
      white_cat: () => new CatPlayable(),
      mosquito: () => new MosquitoPlayable(),
      // medicine
      pill: () => new PillPlayable(),
      // medicine-supply
      medicine_pills: () => new MedicinePillsPlayable(),
      first_aid_kit: () => new FirstAidKitPlayable()
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
