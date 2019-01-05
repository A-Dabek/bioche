import { StoreOptions } from 'vuex';
import { FirestoreService } from '@/service/firestore.service';
import { Palette } from '@/interface/palette';

interface PaletteLibraryState {
  library: { [k: string]: Palette };
  default: Palette;
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
    default: { name: 'Black`n`white', primary: '000', secondary: 'fff' }
  },
  getters: {
    getPalette: state => (name: string) => {
      return state.library[name] || state.default;
    }
  },
  mutations: {
    initPaletteLibrary: function(state, library: { [k: string]: Palette }) {
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
          query.forEach(q => (library[q.id] = { ...q.data(), name: q.id }));
          context.commit('initPaletteLibrary', library);
        })
        .catch(() => context.commit('initPaletteLibrary', {}));
    }
  }
};
