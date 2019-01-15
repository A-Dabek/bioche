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

  getValues(): {[k: string]: any} {
    return {};
  }

  getPresentation(): {key: string, value: string}[] {
    return this.getSubStates().map(k => {
      return {
        key: k.name,
        value: k.presentationValue()
      };
    });
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
