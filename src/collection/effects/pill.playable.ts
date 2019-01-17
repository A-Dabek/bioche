import {PlayableIcon} from '@/core/playable-icon';
import {GameState} from '@/interface/game-state';
import {LiverOrgan} from '@/collection/organ/liver-organ';
import {PlayableUtils} from '@/collection/playable-utils';
import {KidneysOrgan} from '@/collection/organ/kidneys-organ';

export class PillPlayable implements PlayableIcon {
  applyEffect(gameState: GameState) {
    const liver = PlayableUtils.findConcrete<LiverOrgan>('liver', gameState.targetState);
    const kidneys = PlayableUtils.findConcrete<KidneysOrgan>('kidneys', gameState.targetState);
    if (kidneys) {
      kidneys.health.changeValueBy(gameState, 1);
    }
    if (liver) {
      liver.health.changeValueBy(gameState, -1);
    }
  }
}