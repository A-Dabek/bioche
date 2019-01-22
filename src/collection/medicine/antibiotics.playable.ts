import {PlayableIcon} from '@/core/playable-icon';
import {GameState} from '@/interface/game-state';
import {PlayableUtils} from '@/collection/playable-utils';
import {BowelsOrgan} from '@/collection/organ/bowels-organ';

export class AntibioticsPlayable implements PlayableIcon {
  applyEffect(gameState: GameState): void {
    const bowels = PlayableUtils.findConcrete<BowelsOrgan>('bowels', gameState.state);
    if (bowels) {
      bowels.bacteria.changeValueBy(gameState, -3);
      bowels.antibodies.changeValueBy(gameState, -3);
    }
  }
}