import {StoreOptions} from 'vuex';
import {FirestoreUserService} from '@/service/firestore-user.service';
import {FirestoreService} from '@/service/firestore.service';
import {NavigationEnum, NavigationMutationGoTo} from './navigation.store';
import {UsersStoreStartGameAction} from './users.store-module';
import {FirebaseUser} from '@/interface/firebase-user';

const userService = new FirestoreUserService(
  FirestoreService.getInstance().getDB()
);

export class LobbyStoreEnterAction {
  type = 'enterLobby';
  constructor(public name: string) {}
}

export class LobbyStoreChallengeAction {
  public type: string;
  constructor(public name: string) {
    this.type = 'challenge';
  }
}

class LobbyStoreHooksMutation {
  type = 'setHooks';
  constructor(public hook1: () => void, public hook2: () => void) {}
}

interface LobbyState {
  availableUsers: FirebaseUser[];
  challengingMeUsers: FirebaseUser[];
  _availableSnapshotHook: () => void;
  _challengingSnapshotHook: () => void;
  _challengerHook: () => void;
}

export const LobbyStore: StoreOptions<LobbyState> = {
  state: {
    availableUsers: [],
    challengingMeUsers: [],
    _availableSnapshotHook: () => {},
    _challengingSnapshotHook: () => {},
    _challengerHook: () => {}
  },
  mutations: {
    setHooks: function(state, mutation: LobbyStoreHooksMutation) {
      state._availableSnapshotHook = mutation.hook1;
      state._challengingSnapshotHook = mutation.hook2;
    },
    setChallengerHook: function(state, hook: () => void) {
      state._challengerHook = hook;
    },
    setAvailableUsers: function(state, users: FirebaseUser[]) {
      state.availableUsers = users;
    },
    setChallengingUsers: function(state, users: FirebaseUser[]) {
      state.challengingMeUsers = users;
    }
  },
  actions: {
    enterLobby: function(context, action: LobbyStoreEnterAction) {
      context.state._availableSnapshotHook();
      context.state._challengingSnapshotHook();
      const hook1 = userService.getAvailableUsers(users =>
        context.commit(
          'setAvailableUsers',
          users.filter(i => i.name !== action.name)
        )
      );
      const hook2 = userService.getChallengingMeUsers(action.name, users =>
        context.commit('setChallengingUsers', users)
      );
      context.commit(new LobbyStoreHooksMutation(hook1, hook2));
      context.commit(new NavigationMutationGoTo(NavigationEnum.lobby));
    },
    challenge: function(context, action: LobbyStoreChallengeAction) {
      let toChallenge = action.name;
      const user = (context.rootState as any).users.user;
      if (!user) return;
      if (user.challenging === action.name) {
        toChallenge = '';
        context.state._challengerHook();
      } else {
        const hook = userService.listenToUserChanges(toChallenge, u => {
          if (u && u.challenging === user.name) {
            hook();
            context.dispatch(new UsersStoreStartGameAction(u.name));
          }
        });
        context.commit('setChallengerHook', hook);
      }
      userService.updateUser({
        name: user.name,
        challenging: toChallenge
      });
    }
  }
};
