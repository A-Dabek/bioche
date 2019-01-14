import {StatefulIcon} from '@/core/stateful-icon';
import {GameState} from '@/interface/game-state';

export abstract class OrganPlayable extends StatefulIcon {
  onTurnEnd(gameState: GameState): void {
  }

  onTurnStart(gameState: GameState): void {
  }

  onGameStart(): void {
    this.effects = [
      {name: 'health', value: 10},
      {name: 'active', value: true}
    ]
  }
}
