import {NumberStatefulIconSubState} from '@/interface/stateful-icon-sub-state';
import {GameState} from '@/interface/game-state';

export class HealthUpSubState extends NumberStatefulIconSubState {

  private pristine: boolean;

  setValue(gameState: GameState, newValue: number): void {
    super.setValue(gameState, newValue);
    if (this.getValue() < this.startValue) this.pristine = false;
  }

  presentation(): { key: string; value: string; className: string } {
    return {
      ...super.presentation(),
      key: this.pristine ? 'health_up' : super.presentation().key
    };
  }

  healUp(gameState: GameState): void {
    if (this.pristine) {
      this.changeValueBy(gameState, 1)
    }
  }

  constructor(private startValue: number) {
    super('health_normal', 'health', startValue);
    this.pristine = true;
  }
}