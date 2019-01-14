import {IconState} from '@/interface/playable-state';

export interface GameState {
    state: IconState[],
    hand: string[],
    enemyState: IconState[]
    targetState: IconState[]
}