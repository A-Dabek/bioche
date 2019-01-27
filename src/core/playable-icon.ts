import { GameState } from '@/interface/game-state';
import { DescriptiveIcon } from './description/descriptive-icon';

export interface PlayableIcon extends DescriptiveIcon {
  applyEffect(gameState: GameState): void;
}
