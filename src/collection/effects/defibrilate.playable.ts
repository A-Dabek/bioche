import {GameState} from '@/interface/game-state';
import {HeartOrgan} from '@/collection/organ/heart-organ';
import {PlayableIcon} from '@/core/playable-icon';

export class DefibrilateEffect implements PlayableIcon {
  applyEffect(gameState: GameState) {
    const heart = gameState.targetState.find(i => i instanceof HeartOrgan);
    if (!heart || !(heart instanceof HeartOrgan)) return;
    (heart as HeartOrgan).stopped.changeValue(gameState, !(heart as HeartOrgan).stopped.getValue());
    (heart as HeartOrgan).health.changeValue(gameState, (heart as HeartOrgan).health.getValue() - 1);
  }
}
