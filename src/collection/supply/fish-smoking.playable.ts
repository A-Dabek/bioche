import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class FishSmokingPlayable extends SupplyPlayable {
  constructor() {
    super(Array(3).fill('fish'));
  }
}