import {StatefulIcon} from '@/core/stateful-icon';

export namespace PlayableUtils {
  export function findConcrete<T extends StatefulIcon>(name: string, states: StatefulIcon[]): T | null {
    return states.find(i => i.name === name) as T
  }
}