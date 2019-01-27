import { PlayableUtils } from '@/collection/playable-utils';
import { PlayableIcon } from '@/core/playable-icon';
import { GameState } from '@/interface/game-state';
import { BowelsOrgan } from '@/collection/organ/bowels-organ';
import { Description } from '@/core/description/description';

export class GarlicPlayable implements PlayableIcon {
  getDescription(): Description[] {
    return [
      {
        code: 'Zmniejsza liczbę {{virus}} {{parmecia}} i {{worms}} o 1'
      }
    ];
  }

  applyEffect(gameState: GameState): void {
    const bowels = PlayableUtils.findConcrete<BowelsOrgan>(
      'bowels',
      gameState.state
    );
    if (bowels) {
      bowels.bacteria.changeValueBy(gameState, -1);
      bowels.virus.changeValueBy(gameState, -1);
      bowels.parasite.changeValueBy(gameState, -1);
    }
  }
}
