import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex';
import {FblState} from './fbl-state'
import { FblUser } from '@/interface/fbl-user';
import Axios from 'axios';
import { FblComment } from '@/interface/fbl-comment';

Vue.use(Vuex);

const remoteUrl = 'https://jsonplaceholder.typicode.com';

export const FblStore = new Vuex.Store<FblState>({
  state: {
    user: {
      name: 'Mysz Pysz',
      thumbnailUrl: 'default-avatar.png',
    },
    comments: []
  },
  mutations: {
    setUserName(state: FblState) {
      state.user.name = 'Some name'
    },
    setComments(state: FblState, comments: FblComment[]) {
      state.comments = comments;
    },
    upsertComment(state: FblState, comment: FblComment) {
      const foundIndex = state.comments.find(i => i.id === comment.id);
      if (foundIndex) state.comments = state.comments.map(i => i.id === comment.id ? {...i, ...comment} : i);
      else state.comments.push(comment)
    }
  },
  actions: {
    getComments (context, id: number) {
      Axios.get<FblComment[]>(`${remoteUrl}/comments?postId=${id}`)
        .then(response => context.commit('setComments', response.data));
    },
    addComment(context, payload: {postId: number, body: string}) {
      Axios.post(`${remoteUrl}/comments`, {body: payload.body, postId: payload.postId})
        .then(response => context.commit('upsertComment', response.data));
    }
  }
});
