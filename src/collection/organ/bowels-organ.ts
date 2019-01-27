import { OrganPlayable } from './organ-playable';
import { FirebaseStatefulIcon } from '@/interface/firebase-stateful-icon';
import { AntibodiesSubState } from '@/collection/organ/bowels/antibodies.sub-state';
import { StatefulIconSubState } from '@/interface/stateful-icon-sub-state';
import { BacteriaSickSubState } from '@/collection/bacteria/bacteria-sick.sub-state';
import { ParasiteSickSubState } from '@/collection/parasite/parasite-sick.sub-state';
import { VirusSickSubState } from '@/collection/virus/virus-sick.sub-state';
import { GameState } from '@/interface/game-state';
import { Description } from '@/core/description/description';

export class BowelsOrgan extends OrganPlayable {
  readonly antibodies: AntibodiesSubState;
  readonly bacteria: BacteriaSickSubState;
  readonly virus: VirusSickSubState;
  readonly parasite: ParasiteSickSubState;

  getDescription(): Description[] {
    return [
      ...super.getDescription(),
      {
        code: 'Produkują {{antibody}} na końcu każdej tury'
      }
    ];
  }

  getSubStates(): StatefulIconSubState<any>[] {
    return [
      ...super.getSubStates(),
      this.antibodies,
      this.virus,
      this.bacteria,
      this.parasite
    ];
  }

  onTurnEnd(gameState: GameState): void {
    super.onTurnEnd(gameState);
    this.antibodies.changeValueBy(gameState, 5);
    if (this.bacteria.getValue() > 0) {
      this.antibodies.changeValueBy(gameState, -this.bacteria.getValue());
      if (this.antibodies.getValue() > 0)
        this.bacteria.changeValueBy(gameState, -1);
    }
    if (this.virus.getValue() > 0) {
      this.antibodies.changeValueBy(gameState, -this.virus.getValue());
      if (this.antibodies.getValue() > 0)
        this.virus.changeValueBy(gameState, -1);
    }
    if (this.parasite.getValue() > 0) {
      this.antibodies.changeValueBy(gameState, -this.parasite.getValue());
      if (this.antibodies.getValue() > 0)
        this.parasite.changeValueBy(gameState, -1);
    }
  }

  constructor(state?: FirebaseStatefulIcon) {
    super('bowels', state);
    this.antibodies = new AntibodiesSubState(
      'antibody',
      'antibodies',
      state ? state.values['antibodies'] : 10
    );
    this.bacteria = new BacteriaSickSubState(
      'parmecia',
      'bacteria',
      state ? state.values['bacteria'] : 0
    );
    this.virus = new VirusSickSubState(
      'virus',
      'virus',
      state ? state.values['virus'] : 0
    );
    this.parasite = new ParasiteSickSubState(
      'worms',
      'parasite',
      state ? state.values['parasite'] : 0
    );
  }
}
