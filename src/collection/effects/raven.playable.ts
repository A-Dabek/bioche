import { GameState } from '@/interface/game-state';
import { PlayableIcon } from '@/core/playable-icon';
import { PlayableUtils } from '@/collection/playable-utils';
import { LiverOrgan } from '@/collection/organ/liver-organ';
import { Description } from '@/core/description/description';

export class RavenPlayable implements PlayableIcon {
  getDescription(): Description[] {
    return [{ code: 'Zmniejsza {{health_normal}} {{liver}} o 1' }];
  }

  applyEffect(gameState: GameState) {
    const liver = PlayableUtils.findConcrete<LiverOrgan>(
      'liver',
      gameState.targetState
    );
    if (liver) {
      liver.health.changeValueBy(gameState, -1);
    }
  }
}
