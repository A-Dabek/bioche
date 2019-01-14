import {GameState} from '@/interface/game-state';
import {HeartOrgan} from '@/collection/organ/heart-organ';
import {PlayableIcon} from '@/core/playable-icon';
import {PassiveEffect} from '@/interface/passive-effect';

export class DefibrilateEffect implements PlayableIcon {

  applyEffect(gameState: GameState) {
    const heart = gameState.targetState.find(i => i instanceof HeartOrgan);
    if (!heart) return;
    const activeEffect = heart.effects.find((e: PassiveEffect) => e.name === 'pause_button');
    if (activeEffect) heart.effects = heart.effects.filter((e: PassiveEffect) => e.name !== 'pause_button');
    else {
      heart.effects = heart.effects.concat({name: 'pause_button', value: null});
    }
  }
}
