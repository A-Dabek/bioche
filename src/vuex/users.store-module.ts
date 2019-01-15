import {StoreOptions} from 'vuex';
import {FirestoreService} from '@/service/firestore.service';
import {GameService} from '@/service/game-service';
import {NavigationEnum, NavigationMutationGoTo} from './navigation.store';
import {FirestoreUserService} from '@/service/firestore-user.service';
import {FirebaseUser} from '@/interface/firebase-user';

const userService = new FirestoreUserService(
  FirestoreService.getInstance().getDB()
);

export class UsersStoreStartGameAction {
  public type: string;
  constructor(public enemyName: string) {
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

export class UsersStoreSetUser {
  type = 'setUser';
  constructor(public name: string) {}
}

export class UsersStoreSetEnemy {
  type = 'setEnemy';
  constructor(public name: string) {}
}

export class UsersStoreSetPalette {
  type = 'setPalette';
  constructor(public name: string) {}
}

interface UsersState {
  user: FirebaseUser | null;
  _userHook: () => void;
  enemy: FirebaseUser | null;
  _enemyHook: () => void;
}

export const UsersStore: StoreOptions<UsersState> = {
  state: {
    user: null,
    _userHook: () => {},
    enemy: null,
    _enemyHook: () => {}
  },
  getters: {
    myTurn: function(state) {
      if (!state.user || !state.enemy) return false;
      if (state.user.turn) return true;
      if (state.enemy.turn) return false;
      return state.user.roll > state.enemy.roll;
    }
  },
  mutations: {
    setUser: function(state, user: FirebaseUser) {
      state.user = user;
    },
    setUserHook: function(state, hook: () => void) {
      state._userHook = hook;
    },
    setEnemy: function(state, user: FirebaseUser) {
      state.enemy = user;
    },
    setEnemyHook: function(state, hook: () => void) {
      state._enemyHook = hook;
    }
  },
  actions: {
    setUser: function(context, action: UsersStoreSetUser) {
      context.state._userHook();
      const hook = userService.listenToUserChanges(
        action.name,
        (user: null | FirebaseUser) => {
          if (!user) {
            userService.setUser({ name: action.name, challenging: '' });
          } else {
            if (!context.state.user) {
              context.dispatch(new UsersStoreSetEnemy(user.playing));
              // context.dispatch(new LobbyStoreEnterAction(action.name));
            }
            else if (
              context.state.user &&
              !context.state.user.winner &&
              !!user.winner
            ) {
              context.commit(new NavigationMutationGoTo(NavigationEnum.finish));
              context.state._enemyHook();
              context.commit('setEnemy', null);
            }
            context.commit('setUser', {...user, turn: true});
          }
        }
      );
      context.commit('setUserHook', hook);
    },
    setEnemy: function(context, action: UsersStoreSetEnemy) {
      context.state._enemyHook();
      const hook = userService.listenToUserChanges(
        action.name,
        (user: null | FirebaseUser) => {
          if (!user) return;
          if (!context.state.enemy) {
            context.commit(new NavigationMutationGoTo(NavigationEnum.game));
          }
          context.commit('setEnemy', user);
        }
      );
      context.commit('setEnemyHook', hook);
    },
    startGame: function(context, action: UsersStoreStartGameAction) {
      if (!context.state.user) return;
      context.dispatch(new UsersStoreSetEnemy(action.enemyName));

      userService.updateUser({
        name: context.state.user.name,
        playing: action.enemyName,
        challenging: '',
        roll: Math.random(),
        turn: false,
        winner: '',
        lastPlay: '',
        hand: Array(4)
          .fill(1)
          .map(() => GameService.getInstance().getRandomIcon()) as string[],
        state: GameService.getInstance().startingState()
      });
    },
    play: function(context, action: UsersStorePlayAction) {
      if (!context.state.user) return;
      if (!context.state.enemy) return;
      let userTarget;
      if (action.target === context.state.user.name)
        userTarget = context.state.user;
      else userTarget = context.state.enemy;

      const tempState = GameService.getInstance().play(
        context.state.user.hand[action.playedIndex],
        userTarget.state
      );
      const targetWon = GameService.getInstance().isWinConditionMet(tempState);
      if (targetWon) {
        userService.updateUser({
          name: context.state.user.name,
          winner: userTarget.name,
          playing: '',
          challenging: '',
          turn: false,
          lastPlay: '',
          hand: [],
          state: []
        });
        userService.updateUser({
          name: context.state.enemy.name,
          winner: userTarget.name,
          playing: '',
          challenging: '',
          turn: false,
          lastPlay: '',
          hand: [],
          state: []
        });
        return;
      }
      userService.updateUser({
        name: context.state.user.name,
        turn: false,
        roll: 0,
        lastPlay: context.state.user.hand[action.playedIndex],
        hand: context.state.user.hand
          .filter((_, index) => index !== action.playedIndex)
          .concat(GameService.getInstance().getRandomIcon()),
        state: GameService.getInstance().endTurn(
          context.state.user.name === userTarget.name
            ? tempState
            : context.state.user.state
        )
      });
      userService.updateUser({
        name: context.state.enemy.name,
        turn: true,
        roll: 0,
        state:
          context.state.enemy.name === userTarget.name
            ? tempState
            : context.state.enemy.state
      });
    },
    permuteHand: function(context, action: UsersStorePermuteHandAction) {
      if (!context.state.user) return null;
      userService.updateUser({
        name: context.state.user.name,
        hand: action.newHand
      });
    },
    setPalette: function(context, action: UsersStoreSetPalette) {
      if (!context.state.user) return null;
      userService.updateUser({
        name: context.state.user.name,
        palette: action.name
      });
    }
  }
};
