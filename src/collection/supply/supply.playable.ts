import {PlayableIcon} from '@/core/playable-icon';
import {GameState} from '@/interface/game-state';

export abstract class SupplyPlayable implements PlayableIcon {
  applyEffect(gameState: GameState) {
    gameState.hand.push(...this.supplies);
  }

  constructor(public supplies: string[]) {
  }
}