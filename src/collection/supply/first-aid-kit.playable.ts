import {SupplyPlayable} from '@/collection/supply/supply.playable';

export class FirstAidKitPlayable extends SupplyPlayable {
  constructor() {
    super(['defibrilate', 'medicine_pills']);
  }
}