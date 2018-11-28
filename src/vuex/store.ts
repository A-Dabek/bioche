import Vue from 'vue'
import Vuex from 'vuex';
import {FblState} from './fbl-state'
import { FblUser } from '@/interface/fbl-user';

Vue.use(Vuex);

export const FblStore = new Vuex.Store<FblState>({
  state: {
    user: <FblUser>{
      name: '',
      thumbnailUrl: ''
    }
  },
  mutations: {
    setUserName(state: FblState) {
      state.user.name = 'Some name'
    }
  }
});