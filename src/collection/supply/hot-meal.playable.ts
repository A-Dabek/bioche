import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class HotMealPlayable extends SupplyPlayable {
  constructor() {
    super(Array(2).fill('meat'));
  }
}