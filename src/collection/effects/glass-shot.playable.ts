import {GameState} from '@/interface/game-state';
import {KidneysOrgan} from '@/collection/organ/kidneys-organ';
import {PlayableIcon} from '@/core/playable-icon';

export class GlassShotPlayable implements PlayableIcon {
  name: string;

  applyEffect(gameState: GameState): void {
    const kidneys = gameState.targetState.find(i => i instanceof KidneysOrgan);
    if (!kidneys) return;
    (kidneys as KidneysOrgan).water.changeValue(gameState, (kidneys as KidneysOrgan).water.getValue() + 5);
  }

  constructor() {
    this.name = 'glass_shot';
  }
}
