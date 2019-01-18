import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class VendingMachinePlayable extends SupplyPlayable {
  constructor() {
    super(Array(2).fill('chocolate'));
  }
}