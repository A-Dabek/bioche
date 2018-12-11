import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex';
import { Playable } from '@/icons/playable';

Vue.use(Vuex);

export const FblStore = new Vuex.Store({
  state: {
    playerHand: [] as Playable[],
    playerState: [] as Playable[],
    enemyState: [] as Playable[],
  },
  mutations: {
    addToHand: function(state, playable: Playable) {
      state.playerHand = state.playerHand.concat(playable)
    },
    addToState: function(state, playable: Playable) {
      if (playable.addFirst) {
        state.playerState = [playable].concat(state.playerState)
      } else {
        state.playerState = state.playerState.concat(playable)
      }
    },
  }
});
