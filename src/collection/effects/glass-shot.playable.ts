import {GameState} from '@/interface/game-state';
import {KidneysOrgan} from '@/collection/organ/kidneys-organ';
import {PlayableIcon} from '@/core/playable-icon';
import {PlayableUtils} from '@/collection/playable-utils';

export class GlassShotPlayable implements PlayableIcon {
  name: string;

  applyEffect(gameState: GameState): void {
    const kidneys = PlayableUtils.findConcrete<KidneysOrgan>('kidneys', gameState.targetState);
    if (kidneys) {
      kidneys.water.setValue(gameState, (kidneys as KidneysOrgan).water.getValue() + 5);
    }
  }

  constructor() {
    this.name = 'glass_shot';
  }
}
