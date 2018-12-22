import { StoreOptions } from 'vuex';
import { User } from '@/interface/user';
import { FirestoreService } from '@/service/firestore.service';
import { GameService } from '@/service/game-service';

interface UsersState {
  users: User[],
  currentUser: string;
}

const db = FirestoreService.getInstance().getDB();

export class UsersStoreFetchUsersAction {
  public type: string;
  constructor() {
    this.type = 'fetchUsers';
  }
}

export class UsersStoreSignInAction {
  public type: string;
  constructor(public name: string) {
    this.type = 'signIn';
  }
}

export class UsersStoreChallengeAction {
  public type: string;
  constructor(public name: string) {
    this.type = 'challenge';
  }
}

export class UsersStoreStartGameAction {
  public type: string;
  constructor() {
    this.type = 'startGame';
  }
}

export class UsersStorePlayAction {
  public type: string;
  constructor(public played: string, public target: string) {
    this.type = 'play';
  }
}

export const UsersStore: StoreOptions<UsersState> = {
  state: {
    users: [],
    currentUser: ''
  },
  getters: {
    user: function(state): User | undefined {
      return state.users.find(i => i.name === state.currentUser)
    },
    enemy: function(state, getters) {
      if (!getters.user) return false;
      return state.users.find(i => i.name === (getters.user as User).challenging);
    },
    nonMeUsers: function(state) {
      return state.users.filter(i => i.name !== state.currentUser)
    },
    availableUsers: function(state, getters) {
      return (getters.nonMeUsers as User[]).filter(i => !i.challenging);
    },
    challengingMeUsers: function(state) {
      return state.users.filter(i => i.challenging === state.currentUser);
    },
    inGame: function(state, getters) {
      return !!getters.enemy && (getters.enemy as User).challenging === state.currentUser;
    },
  },
  mutations: {
    setUsers: function(state, users: User[]) {
      state.users = users;
    },
    setCurrentUser: function(state, name: string) {
      state.currentUser = name;
    },
  },
  actions: {
    fetchUsers: function(context) {
      db.collection('users')
        .onSnapshot(query => {
          const temp = [] as User[];
          query.forEach(q => temp.push({...q.data() as User, name: q.id}));
          context.commit('setUsers', temp)
        });
    },
    signIn: function(context, action: UsersStoreSignInAction) {
      db.collection('users')
        .doc(action.name)
        .set({challenging: ''} as User)
        .then(() => context.commit('setCurrentUser', action.name))
        .catch(() => {});
    },
    challenge: function(context, action: UsersStoreChallengeAction) {
      let toChallenge = action.name;
      if (context.getters.user.challenging === action.name) toChallenge = '';
      db.collection('users')
        .doc(context.state.currentUser)
        .update({challenging: toChallenge} as User);
    },
    startGame: function(context, action: UsersStoreChallengeAction) {
      db.collection('users')
        .doc(context.state.currentUser)
        .update({hand: [] as string[], state: ['bowels'] as string[]} as User);
    },
    play: function(context, action: UsersStorePlayAction) {
      const userTarget = context.state.users.find(i => i.name === action.target);
      if (!userTarget) return;
      const tempHand = GameService.getInstance().play(action.played, userTarget.state);
      db.collection('users')
        .doc(userTarget.name)
        .update({state: tempHand.map(i => i.name)} as Partial<User>);
    },
  }
}
