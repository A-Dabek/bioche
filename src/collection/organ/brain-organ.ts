import {OrganPlayable} from './organ-playable';
import {RawState} from '@/interface/raw-state';

export class BrainOrgan extends OrganPlayable {
  constructor(state?: RawState) {
    super('brain', state);
  }
}
