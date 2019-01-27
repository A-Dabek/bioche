import { PlayableIcon } from '@/core/playable-icon';
import { GameState } from '@/interface/game-state';
import { PlayableUtils } from '@/collection/playable-utils';
import { LiverOrgan } from '@/collection/organ/liver-organ';
import { KidneysOrgan } from '@/collection/organ/kidneys-organ';
import { Description } from '@/core/description/description';

export abstract class FoodPlayable implements PlayableIcon {
  sugarChange: number;
  waterChange: number;

  getDescription(): Description[] {
    return [
      { code: `{{cubes}} zwiększa o ${this.sugarChange}` },
      { code: `{{droplets}} zwiększa o ${this.waterChange}` }
    ];
  }

  applyEffect(gameState: GameState): void {
    const liver = PlayableUtils.findConcrete<LiverOrgan>(
      'liver',
      gameState.targetState
    );
    const kidneys = PlayableUtils.findConcrete<KidneysOrgan>(
      'kidneys',
      gameState.targetState
    );
    if (liver && this.sugarChange) {
      liver.sugar.changeValueBy(gameState, this.sugarChange);
    }
    if (kidneys && this.waterChange) {
      kidneys.water.changeValueBy(gameState, this.waterChange);
    }
  }

  constructor(sugarChange: number, waterChange: number) {
    this.sugarChange = sugarChange;
    this.waterChange = waterChange;
  }
}
