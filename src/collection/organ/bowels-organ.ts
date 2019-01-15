import {OrganPlayable} from './organ-playable';
import {RawState} from '@/interface/raw-state';

export class BowelsOrgan extends OrganPlayable {
  constructor(state?: RawState) {
    super('bowels', state);
  }
}
