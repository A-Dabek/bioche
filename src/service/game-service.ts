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
import {AntibioticsPlayable} from '@/collection/medicine/antibiotics.playable';
import {PillPlayable} from '@/collection/effects/pill.playable';
import {EnvelopePlayable} from '@/collection/bacteria/envelope.playable';
import {ChickenPlayable} from '@/collection/virus/chicken.playable';
import {GooExplosionPlayable} from '@/collection/effects/goo-explosion.playable';
import {GooSpurtPlayable} from '@/collection/effects/goo-spurt.playable';
import {RavenPlayable} from '@/collection/effects/raven.playable';
import {GarlicPlayable} from '@/collection/medicine/garlic.playable';
import {WaterBottlePlayable} from '@/collection/supply/water-bottle.playable';
import {VendingMachinePlayable} from '@/collection/supply/vending-machine.playable';
import {HotMealPlayable} from '@/collection/supply/hot-meal.playable';
import {CookiePlayable} from '@/collection/food/cookie.playable';
import {ChocolatePlayable} from '@/collection/food/chocolate.playable';
import {CakePlayable} from '@/collection/food/cake.playable';
import {CheesePlayable} from '@/collection/food/cheese.playable';
import {BreadPlayable} from '@/collection/food/bread.playable';
import {MeatPlayable} from '@/collection/food/meat.playable';
import {OrangePlayable} from '@/collection/food/orange.playable';
import {FishPlayable} from '@/collection/food/fish.playable';
import {BerriesPlayable} from '@/collection/food/berries.playable';
import {WatermelonPlayable} from '@/collection/food/watermelon.playable';
import {GlassShotPlayable} from '@/collection/food/glass-shot.playable';
import {FruitTreePlayable} from '@/collection/supply/fruit-tree.playable';
import {FruitBowlPlayable} from '@/collection/supply/fruit-bowl.playable';
import {FishSmokingPlayable} from '@/collection/supply/fish-smoking.playable';
import {CoveredJarPlayable} from '@/collection/supply/covered-jar.playable';
import {BerryBushPlayable} from '@/collection/supply/berry-bush.playable';
import {MedicinePillsPlayable} from '@/collection/supply/medicine-pills.playable';
import {FirstAidKitPlayable} from '@/collection/supply/first-aid-kit.playable';

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
      raven: () => new RavenPlayable(),

      // bacteria
      rat: () => new RatPlayable(),
      tick: () => new TickPlayable(),
      envelope: () => new EnvelopePlayable(),

      // virus
      bird: () => new BirdPlayable(),
      fangs: () => new FangsPlayable(),
      chicken: () => new ChickenPlayable(),

      // parasite
      white_cat: () => new CatPlayable(),
      mosquito: () => new MosquitoPlayable(),

      // sick effects
      goo_explosion: () => new GooExplosionPlayable(),
      goo_spurt: () => new GooSpurtPlayable(),

      // medicine
      pill: () => new PillPlayable(),
      medicines: () => new AntibioticsPlayable(),
      garlic: () => new GarlicPlayable(),
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
