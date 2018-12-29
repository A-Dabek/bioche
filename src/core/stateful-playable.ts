import { ReactivePlayable } from './reactive-playable';
import { PlayableState } from '@/interface/playable-state';

export interface StatefulPlayable extends ReactivePlayable, PlayableState {
  getState(): PlayableState;
}
