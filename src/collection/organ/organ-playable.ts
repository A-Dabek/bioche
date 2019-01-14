import {StatefulIcon} from '@/core/stateful-icon';
import {GameState} from '@/interface/game-state';

export abstract class OrganPlayable extends StatefulIcon {
  onTurnEnd(gameState: GameState): void {
  }

  onTurnStart(gameState: GameState): void {
  }

  onGameStart(): this {
    this.setState({
      name: this.name,
      health_normal: 10,
      pause_button: false
    });
    return this;
  }
}
