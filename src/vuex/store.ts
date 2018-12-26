import Vue from 'vue';
import Vuex from 'vuex';
import { IconLibraryStore } from './icon-library.store-module';
import { UsersStore } from './users.store-module';
import { NavigationStore } from './navigation.store';
import { LobbyStore } from './lobby.store-module';

Vue.use(Vuex);

export const AppStoreObject = new Vuex.Store<any>({
  modules: {
    library: IconLibraryStore,
    users: UsersStore,
    navigation: NavigationStore,
    lobby: LobbyStore
  }
});
