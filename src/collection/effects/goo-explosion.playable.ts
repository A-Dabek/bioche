import { PlayableIcon } from '@/core/playable-icon';
import { GameState } from '@/interface/game-state';
import { PlayableUtils } from '@/collection/playable-utils';
import { BowelsOrgan } from '@/collection/organ/bowels-organ';
import { Description } from '@/core/description/description';

export class GooExplosionPlayable implements PlayableIcon {
  getDescription(): Description[] {
    return [{ code: 'Zmniejsza {{health_normal}} {{liver}} o 1' }];
  }

  applyEffect(gameState: GameState): void {
    const myBowels = PlayableUtils.findConcrete<BowelsOrgan>(
      'bowels',
      gameState.state
    );
    const theirBowels = PlayableUtils.findConcrete<BowelsOrgan>(
      'bowels',
      gameState.enemyState
    );
    if (myBowels && theirBowels) {
      theirBowels.bacteria.changeValueBy(
        gameState,
        Math.floor(myBowels.bacteria.getValue() / 3)
      );
      theirBowels.virus.changeValueBy(
        gameState,
        Math.floor(myBowels.virus.getValue() / 3)
      );
    }
  }
}
