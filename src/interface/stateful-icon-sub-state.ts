import {GameState} from '@/interface/game-state';

export interface StatefulIconSubState<T> {
  readonly name: string;
  readonly mapper: string;
  readonly className: string;
  getValue(): T;
  presentation(): {key: string, value: string, className: string};
  setValue(gameState: GameState, newValue: T): void;
}

export class BasicStatefulIconSubState<T extends number | string | boolean> implements  StatefulIconSubState<T> {

  readonly className = '';
  private value: T;

  getValue(): T {
    return this.value;
  }

  presentation(): {key: string, value: string, className: string} {
    return {
      key: this.name,
      value: String(this.value),
      className: this.className
    };
  }

  setValue(gameState: GameState, newValue: T): void {
    this.value = newValue;
  }

  constructor(readonly name: string, readonly mapper: string, startValue: T) {
    this.value = startValue;
  }
}

export class NumberStatefulIconSubState extends BasicStatefulIconSubState<number> {

  changeValueBy(gameState: GameState, changeBy: number): void {
    let newValue = this.getValue() + changeBy;
    if (newValue < 0) newValue = 0;
    this.setValue(gameState, newValue);
  }
}

export class BooleanStatefulIconSubState extends BasicStatefulIconSubState<boolean> {

  presentation(): {key: string, value: string, className: string} {
    return {
      ...super.presentation(),
      className: 'stop-beating',
      key: this.getValue() ? this.name : ''
    }
  }
}

