import {OrganPlayable} from './organ-playable';
import {GameState} from '@/interface/game-state';
import {RawState} from '@/interface/raw-state';

export class KidneysOrgan extends OrganPlayable {
  private _water?: number;

  getWater(): number {
    return this._water || 0;
  }

  onWaterChange(gameState: GameState, newValue: number): void {
    this._water = newValue;
  }

  setState(obj: RawState): void {
    super.setState(obj);
    this._water = obj['droplets'];
  }

  getState(): RawState {
    return {
      ...super.getState(),
      droplets: this.getWater()
    };
  }
}
