import {StatefulIcon} from '@/core/stateful-icon';

export interface GameState {
  state: StatefulIcon[],
  hand: string[],
  enemyState: StatefulIcon[]
  targetState: StatefulIcon[]
}