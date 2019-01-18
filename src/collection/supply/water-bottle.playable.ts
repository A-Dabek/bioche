import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class WaterBottlePlayable extends SupplyPlayable {
  constructor() {
    super(Array(4).fill('glass_shot'));
  }
}