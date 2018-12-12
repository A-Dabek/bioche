import { Target } from './target';
import { Playable } from './playable';
import { Tribe } from './tribe';

export class TargetName implements Target {
  pointTargets(playables: Playable[]): Playable[] {
    return playables.filter(i => i.name === this.name)
  }

  constructor(private name: string) { }
}

export class TargetRef implements Target {
  pointTargets(playables: Playable[]): Playable[] {
    return playables.filter(i => i === this.ref)
  }

  constructor(private ref: Playable) { }
}

export class TargetTribe implements Target {
  pointTargets(playables: Playable[]): Playable[] {
    return playables.filter(i => i.tribe.constructor === this.tribe.constructor)
  }

  constructor(private tribe: Tribe) { }
}
