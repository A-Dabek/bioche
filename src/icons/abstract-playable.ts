import { Playable } from './playable';
import { IconFactory } from '@/service/icon-factory';
import { IconLibrary } from './icon-library';
import { PlayableType } from './playable-type';
import { Placement } from './placement';
import { GameEvent } from '@/interface/game-event';

export class AbstractPlayable implements Playable {

  reactToEvents(ev: GameEvent[]): GameEvent[] {
    return ev;
  }

  dispatchEvents(): GameEvent[] {
    return [];
  }

  protected constructor(
    public icon: keyof IconLibrary,
    public placement: Placement,
    public type: PlayableType
    ) {
  }
}