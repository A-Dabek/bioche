import { PlayableIcon } from '@/core/playable-icon';
import { GameState } from '@/interface/game-state';
import { LiverOrgan } from '@/collection/organ/liver-organ';
import { PlayableUtils } from '@/collection/playable-utils';
import { KidneysOrgan } from '@/collection/organ/kidneys-organ';
import { Description } from '@/core/description/description';

export class PillPlayable implements PlayableIcon {
  getDescription(): Description[] {
    return [
      { code: '{{kidneys}} - zwiększa {{health_normal}} o 1' },
      { code: '{{liver}} - zmniejsza {{health_normal}} o 1' }
    ];
  }
  applyEffect(gameState: GameState) {
    const liver = PlayableUtils.findConcrete<LiverOrgan>(
      'liver',
      gameState.targetState
    );
    const kidneys = PlayableUtils.findConcrete<KidneysOrgan>(
      'kidneys',
      gameState.targetState
    );
    if (kidneys) {
      kidneys.health.changeValueBy(gameState, 1);
    }
    if (liver) {
      liver.health.changeValueBy(gameState, -1);
    }
  }
}
