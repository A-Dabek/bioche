import {IconState} from '@/interface/icon-state';
import {GameState} from '@/interface/game-state';
import {PassiveEffect} from '@/interface/passive-effect';
import {RawState} from '@/interface/raw-state';

export abstract class StatefulIcon implements IconState {
  abstract onTurnStart(gameState: GameState): void;
  abstract onTurnEnd(gameState: GameState): void;
  abstract onGameStart(): this;

  effects: PassiveEffect[];

  getState(): RawState {
    const obj = {} as RawState;
    this.effects.forEach(e => {
      obj[e.name] = e.value
    });
    obj.name = this.name;
    return obj;
  };

  setState(obj: RawState) {
    this.effects = Object.keys(obj).map(k => ({name: k, value: obj[k]}));
  }

  constructor(public name: string, state?: RawState) {
    this.effects = [];
    if (state) this.setState(state);
  }
}
