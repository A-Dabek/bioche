import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class FruitTreePlayable extends SupplyPlayable {
  constructor() {
    super(Array(3).fill('orange'));
  }
}