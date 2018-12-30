import { Playable } from './playable';
import { Change } from './change/change';

export interface StatelessPlayable extends Playable {
  dispatch(): Change[];
}
