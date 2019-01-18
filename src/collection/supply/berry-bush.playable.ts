import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class BerryBushPlayable extends SupplyPlayable {
  constructor() {
    super(Array(3).fill('berries'));
  }
}