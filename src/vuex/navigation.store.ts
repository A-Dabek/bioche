import { StoreOptions } from 'vuex';

export enum NavigationEnum {
  logging,
  lobby,
  game,
  finish
}

export interface NavigationState {
  screen: NavigationEnum;
}

export class NavigationMutationGoTo {
  type = 'navigateTo';
  constructor(public destination: NavigationEnum) {}
}

export const NavigationStore: StoreOptions<NavigationState> = {
  state: {
    screen: NavigationEnum.logging
  },
  getters: {
    logging: function(state): boolean {
      return state.screen === NavigationEnum.logging;
    },
    lobby: function(state): boolean {
      return state.screen === NavigationEnum.lobby;
    },
    game: function(state): boolean {
      return state.screen === NavigationEnum.game;
    },
    finish: function(state): boolean {
      return state.screen === NavigationEnum.finish;
    }
  },
  mutations: {
    navigateTo: function(state, mutation: NavigationMutationGoTo) {
      state.screen = mutation.destination;
    }
  }
};
