import { PlayableIcon } from '@/core/playable-icon';
import { GameState } from '@/interface/game-state';
import { Description } from '@/core/description/description';

export abstract class SupplyPlayable implements PlayableIcon {
  getDescription(): Description[] {
    return [
      {
        code: `Dodaje do ręki ${this.supplies.map(i => `{{${i}}}`).join(' ')}`
      }
    ];
  }

  applyEffect(gameState: GameState) {
    gameState.hand.push(...this.supplies);
  }

  constructor(public supplies: string[]) {}
}
