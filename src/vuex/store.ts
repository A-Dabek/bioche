import Vue from 'vue'
import Vuex from 'vuex';
import { IconLibraryStore } from './icon-library.store-module';
import { FirestoreService } from '@/service/firestore.service';
import { UsersStore } from './users.store-module';

Vue.use(Vuex);

export const AppStoreObject = new Vuex.Store<any>({
  modules: {
    library: IconLibraryStore,
    users: UsersStore
  }
});
