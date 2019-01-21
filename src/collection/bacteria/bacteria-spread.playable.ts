import {PlayableIcon} from '@/core/playable-icon';
import {GameState} from '@/interface/game-state';
import {PlayableUtils} from '@/collection/playable-utils';
import {BowelsOrgan} from '@/collection/organ/bowels-organ';


export abstract class BacteriaSpreadPlayable implements PlayableIcon {

  applyEffect(gameState: GameState): void {
    const bowels = PlayableUtils.findConcrete<BowelsOrgan>('bowels', gameState.targetState);
    if (bowels) {
      bowels.bacteria.changeValueBy(gameState, 3);
    }
  }
}