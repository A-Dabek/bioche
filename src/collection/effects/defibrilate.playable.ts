import {GameState} from '@/interface/game-state';
import {HeartOrgan} from '@/collection/organ/heart-organ';
import {PlayableIcon} from '@/core/playable-icon';

export class DefibrilateEffect implements PlayableIcon {

  applyEffect(gameState: GameState) {
    const heart = gameState.targetState.find(i => i instanceof HeartOrgan);
    if (!heart || !(heart instanceof HeartOrgan)) return;
    (heart as HeartOrgan).onActiveChange(gameState, !heart.isActive());
    (heart as HeartOrgan).onHealthChange(gameState, heart.getHealth() - 1);
  }
}
