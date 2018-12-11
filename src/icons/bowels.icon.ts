import { Playable } from '@/icons/playable';
import { IconLibrary } from './icon-library';
import { Placement } from './placement';
import { PlayableType } from './playable-type';
import { GameEvent } from '@/interface/game-event';
import { AbstractPlayable } from './abstract-playable';

export class BowelsIcon extends AbstractPlayable {
  constructor() {
    super('bowels', Placement.last, PlayableType.organ)
  }
}
export class LiverIcon extends AbstractPlayable {
  constructor() {
    super('liver', Placement.last, PlayableType.organ)
  }
}
export class KidneysIcon extends AbstractPlayable {
  constructor() {
    super('kidneys', Placement.last, PlayableType.organ)
  }
}
export class BrainIcon extends AbstractPlayable {
  constructor() {
    super('brain', Placement.last, PlayableType.organ)
  }
}


export class AmericanFootballHelmetIcon extends AbstractPlayable {
  constructor() {
    super('american_football_helmet', Placement.first, PlayableType.protective)
  }
}


export class WineBottleIcon extends AbstractPlayable {
  constructor() {
    super('wine_bottle', Placement.first, PlayableType.harmful)
  }
}

export class SuperMushrromIcon extends AbstractPlayable {
  constructor() {
    super('super_mushroom', Placement.first, PlayableType.harmful)
  }
}