import {OrganPlayable} from './organ-playable';
import {FirebaseStatefulIcon} from '@/interface/firebase-stateful-icon';
import {AntibodiesSubState} from '@/collection/organ/bowels/antibodies.sub-state';
import {StatefulIconSubState} from '@/interface/stateful-icon-sub-state';
import {BacteriaSickSubState} from '@/collection/bacteria/bacteria-sick.sub-state';
import {ParasiteSickSubState} from '@/collection/parasite/parasite-sick.sub-state';
import {VirusSickSubState} from '@/collection/virus/virus-sick.sub-state';

export class BowelsOrgan extends OrganPlayable {

  readonly antibodies: AntibodiesSubState;
  readonly bacteria: BacteriaSickSubState;
  readonly virus: VirusSickSubState;
  readonly parasite: ParasiteSickSubState;

  getSubStates(): StatefulIconSubState<any>[] {
    return [
      ...super.getSubStates(),
      this.antibodies,
      this.virus,
      this.bacteria,
      this.parasite
    ]
  }

  constructor(state?: FirebaseStatefulIcon) {
    super('bowels', state);
    this.antibodies = new AntibodiesSubState('antibody', 'antibodies', state ? state.values['antibodies'] : 10);
    this.bacteria = new BacteriaSickSubState('parmecia', 'bacteria', state ? state.values['bacteria'] : 0);
    this.virus = new VirusSickSubState('virus', 'virus', state ? state.values['virus'] : 0);
    this.parasite = new ParasiteSickSubState('worms', 'parasite', state ? state.values['parasite'] : 0);
  }
}
