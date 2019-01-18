import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class CoveredJarPlayable extends SupplyPlayable {
  constructor() {
    super(Array(3).fill('cookie'));
  }
}