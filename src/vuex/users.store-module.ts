import { StoreOptions } from 'vuex';
import { User } from '@/interface/user';
import { FirestoreService } from '@/service/firestore.service';
import { GameService } from '@/service/game-service';
import { NavigationMutationGoTo, NavigationEnum } from './navigation.store';
import { FirestoreUserService } from '@/service/firestore-user.service';

interface UsersState {
  users: User[];
  currentUser: string;
}

const db = FirestoreService.getInstance().getDB();

const userService = new FirestoreUserService(
  FirestoreService.getInstance().getDB()
);

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
  constructor(public playedIndex: number, public target: string) {
    this.type = 'play';
  }
}

export class UsersStorePermuteHandAction {
  public type: string = 'permuteHand';
  constructor(public newHand: string[]) {}
}

export const UsersStore: StoreOptions<UsersState> = {
  state: {
    users: [],
    currentUser: ''
  },
  getters: {
    user: function(state): User | undefined {
      return state.users.find(i => i.name === state.currentUser);
    },
    enemy: function(state, getters) {
      if (!getters.user) return false;
      return state.users.find(
        i => i.name === (getters.user as User).challenging
      );
    },
    nonMeUsers: function(state) {
      return state.users.filter(i => i.name !== state.currentUser);
    },
    availableUsers: function(state, getters) {
      return (getters.nonMeUsers as User[]).filter(i => !i.challenging);
    },
    challengingMeUsers: function(state) {
      return state.users.filter(i => i.challenging === state.currentUser);
    },
    inGame: function(state, getters) {
      return (
        !!getters.enemy &&
        (getters.enemy as User).challenging === state.currentUser
      );
    },
    winner: function(state, getters): User | null {
      if (getters.user.winner) return getters.user;
      else if (getters.enemy.winner) return getters.enemy;
      return null;
    }
  },
  mutations: {
    setUsers: function(state, users: User[]) {
      state.users = users;
    },
    setCurrentUser: function(state, name: string) {
      state.currentUser = name;
    }
  },
  actions: {
    fetchUsers: function(context) {
      db.collection('users').onSnapshot(query => {
        const temp = [] as User[];
        query.forEach(q => temp.push({ ...(q.data() as User), name: q.id }));
        context.commit('setUsers', temp);
        if (
          context.getters.user &&
          context.getters.enemy &&
          !context.getters.user.turn &&
          !context.getters.enemy.turn &&
          context.getters.user.roll &&
          context.getters.enemy.roll &&
          context.getters.user.name === context.getters.enemy.challenging
        ) {
          console.log(context.getters.user.roll, context.getters.enemy.roll);
          const user =
            context.getters.user.roll > context.getters.enemy.roll
              ? context.getters.user
              : context.getters.enemy;
          userService.updateUser({
            name: user.name,
            turn: true
          });
          userService.updateUser({
            name: context.getters.user.name,
            roll: 0
          });
          userService.updateUser({
            name: context.getters.enemy.name,
            roll: 0
          });
        }
        if (
          context.getters.user &&
          context.getters.enemy &&
          !context.getters.user.winner &&
          !context.getters.enemy.winner &&
          context.getters.user.name === context.getters.enemy.challenging
        ) {
          context.commit(new NavigationMutationGoTo(NavigationEnum.game));
        }
      });
    },
    signIn: function(context, action: UsersStoreSignInAction) {
      userService
        .setUser({ name: action.name })
        .then(() => {
          context.commit('setCurrentUser', action.name);
          context.commit(new NavigationMutationGoTo(NavigationEnum.lobby));
        })
        .catch(() => {});
    },
    challenge: function(context, action: UsersStoreChallengeAction) {
      let toChallenge = action.name;
      if (context.getters.user.challenging === action.name) toChallenge = '';
      userService.updateUser({
        name: context.state.currentUser,
        challenging: toChallenge
      });
    },
    startGame: function(context, action: UsersStoreChallengeAction) {
      userService.updateUser({
        name: context.state.currentUser,
        roll: Math.random(),
        turn: false,
        winner: false,
        hand: Array(4)
          .fill(1)
          .map(() => GameService.getInstance().getRandomIcon()) as string[],
        state: ['bowels'] as string[]
      } as User);
    },
    play: function(context, action: UsersStorePlayAction) {
      const user = context.getters.user as User;
      let userTarget;
      if (action.target === user.name) userTarget = user;
      else userTarget = context.state.users.find(i => i.name === action.target);
      if (!userTarget) return;
      const tempState = GameService.getInstance().play(
        user.hand[action.playedIndex],
        userTarget.state
      );
      const targetWon = GameService.getInstance().isWinConditionMet(
        tempState.map(i => i.name)
      );
      if (targetWon) {
        context.commit(new NavigationMutationGoTo(NavigationEnum.finish));
        userService.updateUser({ name: userTarget.name, winner: true });
      } else {
        userService.updateUser({
          name: userTarget.name,
          state: tempState.map(i => i.name)
        });
        userService.updateUser({
          name: user.name,
          turn: false,
          hand: user.hand
            .filter((_, index) => index !== action.playedIndex)
            .concat(GameService.getInstance().getRandomIcon())
        });
        userService.updateUser({
          name: context.getters.enemy.name,
          turn: true
        });
      }
    },
    permuteHand: function(context, action: UsersStorePermuteHandAction) {
      userService.updateUser({
        name: context.getters.user.name,
        hand: action.newHand
      });
    }
  }
};
