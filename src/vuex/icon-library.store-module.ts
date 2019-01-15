import {StoreOptions} from 'vuex';
import {FirestoreService} from '@/service/firestore.service';
import {FirebaseIcon} from '@/interface/firebase-icon';

interface IconLibraryState {
  library: { [k: string]: FirebaseIcon };
}

export class IconLibraryInitAction {
  public type: string;
  constructor() {
    this.type = 'initLibrary';
  }
}

export const IconLibraryStore: StoreOptions<IconLibraryState> = {
  state: {
    library: {}
  },
  getters: {
    getIcon: (state: IconLibraryState) => (name: string) => {
      return state.library[name] || state.library['help'];
    }
  },
  mutations: {
    initLibrary: function(state, library: { [k: string]: FirebaseIcon }) {
      state.library = {
        help: {
          header: '???',
          description: 'Nie znaleziono ikony',
          path:
            'M256 16C123.45 16 16 123.45 16 256s107.45 240 240 240 240-107.45 240-240S388.55 16 256 16zm0 60c99.41 0 180 80.59 180 180s-80.59 180-180 180S76 355.41 76 256 156.59 76 256 76zm0 30c-66.274 0-120 40.294-120 90 0 30 60 30 60 0 0-16.57 26.862-30 60-30 33.138 0 60 13.43 60 30s-30 15-60 30c-1.875.938-3.478 2.126-4.688 3.28C226.53 244.986 226 271.926 226 286v15c0 16.62 13.38 30 30 30 16.62 0 30-13.38 30-30v-15c0-45 90-40.294 90-90s-53.726-90-120-90zm0 240a30 30 0 0 0-30 30 30 30 0 0 0 30 30 30 30 0 0 0 30-30 30 30 0 0 0-30-30z'
        },
        ...library
      };
    }
  },
  actions: {
    initLibrary: function(context) {
      FirestoreService.getInstance()
        .getDB()
        .collection('library')
        .get()
        .then(query => {
          const library = {} as any;
          query.forEach(q => (library[q.id] = { ...q.data() }));
          context.commit('initLibrary', library);
        })
        .catch(() => context.commit('initLibrary', {}));
    }
  }
};
