import { PlayableIcon } from '@/core/playable-icon';
import { GameState } from '@/interface/game-state';
import { PlayableUtils } from '@/collection/playable-utils';
import { BowelsOrgan } from '@/collection/organ/bowels-organ';
import { Description } from '@/core/description/description';

export abstract class ParasiteSpreadPlayable implements PlayableIcon {
  getDescription(): Description[] {
    return [{ code: '{{worms}} zwiększa o 1' }];
  }

  applyEffect(gameState: GameState): void {
    const bowels = PlayableUtils.findConcrete<BowelsOrgan>(
      'bowels',
      gameState.targetState
    );
    if (bowels) {
      bowels.virus.changeValueBy(gameState, 3);
    }
  }
}
