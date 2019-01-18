import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class FruitBowlPlayable extends SupplyPlayable {
  constructor() {
    super(['orange', 'berries', 'watermelon']);
  }
}