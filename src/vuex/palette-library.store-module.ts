import {StoreOptions} from 'vuex';
import {FirestoreService} from '@/service/firestore.service';
import {FirebasePalette} from '@/interface/firebase-palette';

interface PaletteLibraryState {
  library: { [k: string]: FirebasePalette };
  default: FirebasePalette;
}

export class PaletteLibraryInitAction {
  public type: string;
  constructor() {
    this.type = 'initPaletteLibrary';
  }
}

export const PaletteLibraryStore: StoreOptions<PaletteLibraryState> = {
  state: {
    library: {},
    default: {
      name: 'Black`n`white',
      primary: '000',
      secondary: 'fff',
      idDoc: ''
    }
  },
  getters: {
    getPalette: state => (name: string) => {
      return state.library[name] || state.default;
    }
  },
  mutations: {
    initPaletteLibrary: function(state, library: { [k: string]: FirebasePalette }) {
      state.library = library;
    }
  },
  actions: {
    initPaletteLibrary: function(context) {
      FirestoreService.getInstance()
        .getDB()
        .collection('palettes')
        .get()
        .then(query => {
          const library = {} as any;
          query.forEach(q => {
            const palette = { ...q.data(), idDoc: q.id} as FirebasePalette;
            library[q.id] = { ...palette, primary: `#${palette.primary}`, secondary: `#${palette.secondary}`};
          });
          context.commit('initPaletteLibrary', library);
        })
        .catch(() => context.commit('initPaletteLibrary', {}));
    }
  }
};
