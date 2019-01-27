import { GameState } from '@/interface/game-state';
import { HeartOrgan } from '@/collection/organ/heart-organ';
import { PlayableIcon } from '@/core/playable-icon';
import { PlayableUtils } from '@/collection/playable-utils';
import { Description } from '@/core/description/description';

export class DefibrilateEffect implements PlayableIcon {
  getDescription(): Description[] {
    return [
      {
        code:
          '{{heart}} - zmniejsza {{health_normal}} o 1 i zmienia status {{pause_button}}'
      }
    ];
  }

  applyEffect(gameState: GameState) {
    const heart = PlayableUtils.findConcrete<HeartOrgan>(
      'heart',
      gameState.targetState
    );
    if (heart) {
      heart.stopped.setValue(
        gameState,
        !(heart as HeartOrgan).stopped.getValue()
      );
      heart.health.changeValueBy(gameState, -1);
    }
  }
}
