import { PlayableIcon } from '@/core/playable-icon';
import { GameState } from '@/interface/game-state';
import { PlayableUtils } from '@/collection/playable-utils';
import { BowelsOrgan } from '@/collection/organ/bowels-organ';
import { Description } from '@/core/description/description';

export class AntibioticsPlayable implements PlayableIcon {
  getDescription(): Description[] {
    return [{ code: 'Zmniejsza liczbę {{parmecia}} i {{antibody}} o 3' }];
  }

  applyEffect(gameState: GameState): void {
    const bowels = PlayableUtils.findConcrete<BowelsOrgan>(
      'bowels',
      gameState.state
    );
    if (bowels) {
      bowels.bacteria.changeValueBy(gameState, -3);
      bowels.antibodies.changeValueBy(gameState, -3);
    }
  }
}
