import { StatefulIcon } from '@/core/stateful-icon';
import { GameState } from '@/interface/game-state';
import { FirebaseStatefulIcon } from '@/interface/firebase-stateful-icon';
import {
  BooleanStatefulIconSubState,
  NumberStatefulIconSubState,
  StatefulIconSubState
} from '@/interface/stateful-icon-sub-state';
import { PlayableUtils } from '@/collection/playable-utils';
import { HeartOrgan } from '@/collection/organ/heart-organ';
import { LungsOrgan } from '@/collection/organ/lungs-organ';
import { KidneysOrgan } from '@/collection/organ/kidneys-organ';
import { LiverOrgan } from '@/collection/organ/liver-organ';
import { Description } from '@/core/description/description';

export abstract class OrganPlayable extends StatefulIcon {
  readonly health: NumberStatefulIconSubState;
  readonly stopped: StatefulIconSubState<boolean>;

  getSubStates() {
    return [...super.getSubStates(), this.health, this.stopped];
  }

  getDescription(): Description[] {
    return [
      {
        code: 'Początkowe {{health_normal}} wynosi 10'
      }
    ];
  }

  onTurnEnd(gameState: GameState): void {
    if (this.health.getValue() <= 0) return;
    const heart = PlayableUtils.findConcrete<HeartOrgan>(
      'heart',
      gameState.state
    );
    const lungs = PlayableUtils.findConcrete<LungsOrgan>(
      'lungs',
      gameState.state
    );
    const kidneys = PlayableUtils.findConcrete<KidneysOrgan>(
      'kidneys',
      gameState.state
    );
    const liver = PlayableUtils.findConcrete<LiverOrgan>(
      'liver',
      gameState.state
    );
    if (heart) {
      if (heart.stopped.getValue()) this.health.changeValueBy(gameState, -1);
    }
    if (lungs) {
      if (lungs.stopped.getValue()) this.health.changeValueBy(gameState, -1);
    }
    if (kidneys) {
      if (kidneys.water.getValue() <= 0)
        this.health.changeValueBy(gameState, -1);
      else kidneys.water.changeValueBy(gameState, -1);
    }
    if (liver) {
      if (liver.sugar.getValue() <= 0) this.health.changeValueBy(gameState, -1);
      else liver.sugar.changeValueBy(gameState, -1);
    }
  }

  onTurnStart(gameState: GameState): void {}

  constructor(name: string, state: FirebaseStatefulIcon | undefined) {
    super(name);
    this.health = new NumberStatefulIconSubState(
      'health_normal',
      'health',
      state ? state.values['health'] : 10
    );
    this.stopped = new BooleanStatefulIconSubState(
      'pause_button',
      'stopped',
      state ? state.values['stopped'] : false
    );
  }
}
