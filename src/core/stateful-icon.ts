import {GameState} from '@/interface/game-state';
import {RawState} from '@/interface/raw-state';

export abstract class StatefulIcon {
  readonly name: string;

  protected abstract onGameStart(): RawState;
  abstract onTurnStart(gameState: GameState): void;
  abstract onTurnEnd(gameState: GameState): void;
  abstract setState(obj: RawState): void;

  getPropertyKeys(keys: (keyof this)[]) {
    return [];
  }

  getValues(): {[k: string]: any} {
    return {};
  }

  getPresentation(): {key: string, value: string}[] {
    return [];
  }

  getState(): RawState {
    return {
      name: this.name,
      values: this.getValues(),
      present: this.getPresentation()
    }
  };

  constructor(name: string, state?: RawState) {
    this.name = name;
    if (state) this.setState(state);
    else this.setState(this.onGameStart());
  }
}
