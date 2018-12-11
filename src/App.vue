<template>
  <div id="app" class="container">
    <div class="row enemy-state">
      <div class="col-12">
        <state/>
      </div>
    </div>
    <div class="row player-hand">
      <div class="col-12">
        <hand/>
      </div>
    </div>
    <div class="row player-state">
      <div class="col-11">
        <state/>
      </div>
      <div class="col-1">
        <end-turn/>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import PostVue from './components/Post.vue'
import Axios from 'axios'
import { Post } from './interface/post'
import { FblStore } from './vuex/store'
import IconVue from '@/components/Icon.vue';
import EndTurnVue from '@/components/EndTurn.vue';
import StateVue from '@/components/State.vue';
import HandVue from '@/components/Hand.vue';
import { CollectablePlayable, CollectableFirstPlayable } from '@/core/collectable.playable';
import { HarmfulPlayable } from '@/core/harmful.playable';
import { ProtectivePlayable } from '@/core/protective.playable';
import { Playable } from '@/core/playable';
import { ReactivePlayable } from '@/core/reactive-playable';

let hand = [] as ReactivePlayable[];
let library: {[k: string]: () => ReactivePlayable} = {
  'c1': () => new CollectablePlayable('c1'),
  'c2': () => new CollectablePlayable('c2'),
  'c3': () => new CollectableFirstPlayable('c3'),
  'n1': () => new HarmfulPlayable('n1'),
  'p1': () => new ProtectivePlayable('p1')
};

function getPlayable(name: string): Playable {
  return library[name]();
}

function play(p: string) {
  const played = getPlayable(p);
  hand = eventHandler(played as any, hand) as any;
}

function eventHandler(played: ReactivePlayable, hand: ReactivePlayable[]): Playable[] {
  let events = played.dispatch();
  let new_hand = [...hand];
  hand.forEach(h => events = h.react(events));
  events.forEach(ev => new_hand = ev.process(played, new_hand) as any);
  return new_hand;
}

['c1', 'c2', 'c3', 'n1', 'p1', 'n1'].forEach(i => play(i))

export default Vue.extend({
  name: 'app',
  components: {
    'fbl-icon': IconVue,
    'end-turn': EndTurnVue,
    'state': StateVue,
    'hand': HandVue
  },
  store: FblStore,
  data: () => {
    return {
    }
  }
})
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
</style>
