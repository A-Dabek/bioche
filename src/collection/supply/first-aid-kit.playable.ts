import { SupplyPlayable } from '@/collection/supply/supply.playable';
import { Description } from '@/core/description/description';

export class FirstAidKitPlayable extends SupplyPlayable {
  constructor() {
    super(['defibrilate', 'medicine_pills']);
  }
}
