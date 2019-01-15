import {GameState} from '@/interface/game-state';
import {RawState} from '@/interface/raw-state';

export abstract class StatefulIcon {
  readonly name: string;

  abstract onGameStart(): this;
  abstract onTurnStart(gameState: GameState): void;
  abstract onTurnEnd(gameState: GameState): void;
  abstract setState(obj: RawState): void;

  getState(): RawState {
    return {
      name: this.name
    };
  };

  constructor(name: string, state?: RawState) {
    this.name = name;
    if (state) this.setState(state);
  }
}
