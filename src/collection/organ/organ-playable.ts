import {StatefulIcon} from '@/core/stateful-icon';
import {GameState} from '@/interface/game-state';
import {RawState} from '@/interface/raw-state';

export abstract class OrganPlayable extends StatefulIcon {
  private _health?: number;
  private _active?: boolean;

  getHealth(): number {
    return this._health || 0;
  }

  isActive(): boolean {
    return this._active || false;
  }

  onHealthChange(gameState: GameState, newValue: number): void {

  }

  onActiveChange(gameState: GameState, newValue: boolean): void {
    this._active = newValue;
  }

  onTurnEnd(gameState: GameState): void {
  }

  onTurnStart(gameState: GameState): void {
  }

  setState(obj: RawState): void {
    this._health = obj['health_normal'];
    this._active = obj['pause_button'];
  }

  getState(): RawState {
    const active = this.isActive() ? {pause_button: ''} : {};
    return {
      ...super.getState(),
      health_normal: this.getHealth(),
      ...active
    };
  }

  onGameStart(): this {
    this._health = 10;
    this._active = true;
    this.setState({
      name: this.name,
      health_normal: 10,
      pause_button: false
    });
    return this;
  }
}
