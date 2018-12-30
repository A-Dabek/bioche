import { PlayableState } from '@/interface/playable-state';
import { Playable } from './playable';
import { Change } from './change/change';

export interface StatefulPlayable extends Playable, PlayableState {
  getState(): PlayableState;
  onTurnStart(): Change[];
  onTurnEnd(): Change[];
  react(changes: Change[]): Change[];
}
