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
    this._health = obj.values['health'];
    this._active = obj.values['active'];
  }

  getValues(): { [p: string]: any } {
    return {
      ...super.getValues(),
      health: this.getHealth(),
      active: this.isActive()
    };
  }

  getPresentation(): {key: string, value: string}[] {
    const present = [{key: 'health_normal', value: String(this.getHealth())}];
    if (this.isActive()) return present;
    return present.concat({key: 'pause_button', value: ''});
  }

  onGameStart(): RawState {
    this._health = 10;
    this._active = true;
    return this.getState();
  }
}
