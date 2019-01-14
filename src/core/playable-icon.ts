import {GameState} from '@/interface/game-state';

export interface PlayableIcon {
  applyEffect(gameState: GameState): void;
}
