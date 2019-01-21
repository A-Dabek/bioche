import {PlayableIcon} from '@/core/playable-icon';
import {GameState} from '@/interface/game-state';
import {PlayableUtils} from '@/collection/playable-utils';
import {BowelsOrgan} from '@/collection/organ/bowels-organ';


export abstract class ParasiteSpreadPlayable implements PlayableIcon {

  applyEffect(gameState: GameState): void {
    const bowels = PlayableUtils.findConcrete<BowelsOrgan>('bowels', gameState.targetState);
    if (bowels) {
      bowels.virus.changeValueBy(gameState, 3);
    }
  }
}