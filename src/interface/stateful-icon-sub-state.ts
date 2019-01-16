import {GameState} from '@/interface/game-state';

export interface StatefulIconSubState<T> {
  readonly name: string;
  getValue(): T;
  presentationValue(): string;
  className: string;
  changeValue(gameState: GameState, newValue: T): void;
}

export class BasicStatefulIconSubState<T extends number | string> implements  StatefulIconSubState<T> {

  readonly className = '';
  private value: T;

  getValue(): T {
    return this.value;
  }

  presentationValue(): string {
    return String(this.value);
  }

  changeValue(gameState: GameState, newValue: T): void {
    this.value = newValue;

  }

  constructor(readonly name: string, startValue: T) {
    this.value = startValue;
  }
}

export class BooleanStatefulIconSubState implements  StatefulIconSubState<boolean> {

  private value: boolean;
  readonly className = '';

  getValue(): boolean {
    return this.value;
  }

  presentationValue(): string {
    return '';
  }

  changeValue(gameState: GameState, newValue: boolean): void {
    this.value = newValue;
  }

  constructor(readonly name: string, startValue: boolean) {
    this.value = startValue;
  }
}

