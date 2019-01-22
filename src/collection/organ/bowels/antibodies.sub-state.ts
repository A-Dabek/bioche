import {NumberStatefulIconSubState} from '@/interface/stateful-icon-sub-state';
import {GameState} from '@/interface/game-state';
import {OrganPlayable} from '@/collection/organ/organ-playable';

export class AntibodiesSubState extends NumberStatefulIconSubState {

  changeValueBy(gameState: GameState, changeBy: number): void {
    super.changeValueBy(gameState, changeBy);
    if (this.getValue() <= 0) {
      gameState.state.forEach(i => (i as OrganPlayable).health.changeValueBy(gameState, -1));
    }
  }
}