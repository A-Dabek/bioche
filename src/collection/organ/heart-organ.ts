import {OrganPlayable} from './organ-playable';
import {RawState} from '@/interface/raw-state';

export class HeartOrgan extends OrganPlayable {
  constructor(state?: RawState) {
    super('heart', state);
  }
}
