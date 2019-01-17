import {GameState} from '@/interface/game-state';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {StatefulIconSubState} from '@/interface/stateful-icon-sub-state';


export abstract class StatefulIcon {
  readonly name: string;

  abstract onTurnStart(gameState: GameState): void;
  abstract onTurnEnd(gameState: GameState): void;

  getSubStates(): StatefulIconSubState<any>[] {
    return [];
  }

  getValues(): {[k: string]: string | number | boolean} {
    const obj = {} as {[k: string]: string | number | boolean};
    this.getSubStates().forEach(sub => {
      obj[sub.mapper] = sub.getValue();
    });
    return obj;
  }

  getPresentation(): {key: string, value: string, className: string}[] {
    return this.getSubStates()
      .map(k => k.presentation())
      .filter(k => !!k.key);
  }

  getState(): FirebaseStatefulIcon {
    return {
      name: this.name,
      values: this.getValues(),
      present: this.getPresentation()
    }
  };

  constructor(name: string) {
    this.name = name;
  }
}
