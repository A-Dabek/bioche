import {PlayableIcon} from '@/core/playable-icon';
import {GameState} from '@/interface/game-state';

export class MedicinePillsPlayable implements PlayableIcon {
  applyEffect(gameState: GameState) {
    gameState.hand.push(...Array(3).fill('pill'));
    // const liver = PlayableUtils.findConcrete<LiverOrgan>('liver', gameState.targetState);
    // const kidneys = PlayableUtils.findConcrete<KidneysOrgan>('kidneys', gameState.targetState);
    // if (kidneys) {
    //   kidneys.health.changeValueBy(gameState, 1);
    // }
    // if (liver) {
    //   liver.health.changeValueBy(gameState, -1);
    // }
  }
}