import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class MedicinePillsPlayable extends SupplyPlayable {
  constructor() {
    super(Array(3).fill('pill'));
  }
}