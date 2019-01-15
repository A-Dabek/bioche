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
    this._water = obj.values['water'];
  }

  getPresentation(): {key: string, value: string}[] {
    return super.getPresentation().concat(
      {key: 'droplets', value: String(this.getWater())}
    );
  }

  getValues(): { [p: string]: any } {
    return {
      ...super.getValues(),
      water: this.getWater()
    };
  }

  constructor(state?: RawState) {
    super('kidneys', state);
  }
}
