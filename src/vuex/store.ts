import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex';
import { User } from '@/interface/user';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Playable } from '@/core/playable';
import { CollectablePlayable, CollectableFirstPlayable } from '@/core/collectable.playable';
import { HarmfulPlayable } from '@/core/harmful.playable';
import { ProtectivePlayable } from '@/core/protective.playable';
import { ReactivePlayable } from '@/core/reactive-playable';

Vue.use(Vuex);

firebase.initializeApp({
  apiKey: "AIzaSyCI3eOUziHZCZxME8Q8OmFE_Tcj3DEMxfg",
  authDomain: "icon-database.firebaseapp.com",
  databaseURL: "https://icon-database.firebaseio.com",
  projectId: "icon-database",
  storageBucket: "icon-database.appspot.com",
  messagingSenderId: "969181801717"
});
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

let library: {[k: string]: () => ReactivePlayable} = {
  'bowels': () => new CollectablePlayable('bowels'),
  'kidneys': () => new CollectablePlayable('kidneys'),
  'liver': () => new CollectableFirstPlayable('liver'),
  'wine_bottle': () => new HarmfulPlayable('wine_bottle'),
  'american_football_helmet': () => new ProtectivePlayable('american_football_helmet')
};

function getPlayable(name: string): Playable {
  return library[name]();
}

function play(p: string, hand: ReactivePlayable[]): ReactivePlayable[] {
  const played = getPlayable(p);
  return eventHandler(played as any, hand) as any;
}

function eventHandler(played: ReactivePlayable, hand: ReactivePlayable[]): Playable[] {
  let events = played.dispatch();
  let new_hand = [...hand];
  hand.forEach(h => events = h.react(events));
  events.forEach(ev => new_hand = ev.process(played, new_hand) as any);
  return new_hand;
}

export interface AppStore {
  user: User;
  enemy: User;
  possibleUsers: User[];
}

export const AppStoreObject = new Vuex.Store<AppStore>({
  state: {
    user: {
      name: '',
      hand: [] as string[],
      state: [] as string[],
      playing: ''
    },
    enemy: {
      name: '',
      hand: [] as string[],
      state: [] as string[],
      playing: ''
    },
    possibleUsers: []
  },
  getters: {
    possibleEnemies: state => {
      return state.possibleUsers.filter(i => i.name !== state.user.name)
    }
  },
  mutations: {
    setPossibleUsers: function(state, users: User[]) {
      // const potentialUser = users.find(i => i.name === state.user.name);
      // const potentialEnemy = users.find(i => i.name === state.enemy.name);

      state.possibleUsers = users;
    },
    setUser: function(state, user: User) {
      state.user = user;
    },
    setEnemy: function(state, user: User) {
      state.enemy = user;
    },
  },
  actions: {
    listenToUsersList: function(context) {
      db.collection('users')
      .onSnapshot(query => {
        const temp = [] as User[];
        query.forEach(q => temp.push({...q.data() as User, name: q.id}));
        context.commit('setPossibleUsers', temp)
      });
    },
    addUserToFirebase: function(context, userName: string) {
      db.collection('users')
      .doc(userName)
      .set({state: ['bowels']} as User);
      db.collection('users')
      .doc(userName)
      .get()
      .then(query => context.commit('setUser', {...query.data(), name: query.id}));
    },
    chooseEnemy: function(context, enemyName: string) {
      db.collection('users')
      .doc(enemyName)
      .update({playing: context.state.user.name, state: ['liver']} as Partial<User>);
      db.collection('users')
      .doc(enemyName)
      .onSnapshot(query => context.commit('setEnemy', {...query.data(), name: query.id}));

      db.collection('users')
      .doc(context.state.user.name)
      .update({playing: enemyName, state: ['bowels'], hand: ['kidneys', 'wine_bottle', 'american_football_helmet']} as Partial<User>);
      db.collection('users')
      .doc(context.state.user.name)
      .onSnapshot(query => context.commit('setUser', {...query.data(), name: query.id}));
    },
    playIcon: function(context, iconName: string) {
      console.log(context.state.user.hand);
      console.log(iconName);
      let temp_hand = context.state.user.state.map(i => getPlayable(i));
      temp_hand = play(iconName, temp_hand as any);
      console.log(temp_hand.map(i => i.name));

      db.collection('users')
      .doc(context.state.user.name)
      .update({state: temp_hand.map(i => i.name)} as Partial<User>);
    }
  }
});
