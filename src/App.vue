<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-12">
        <login/>
      </div>
      <div class="col-12" v-if="showEnemyList && !inGame">
        <enemy-list/>
      </div>
      <div class="col-12" v-if="inGame">
        <game/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostVue from '@/components/Post.vue'
import Axios from 'axios'
import { AppStoreObject } from './vuex/store'
import IconVue from '@/components/Icon.vue';
import EndTurnVue from '@/components/EndTurn.vue';
import StateVue from '@/components/State.vue';
import HandVue from '@/components/Hand.vue';
import LoginVue from '@/components/Login.vue';
import EnemyListVue from '@/components/EnemyList.vue';
import GameVue from '@/components/Game.vue';
import { IconLibraryInitAction } from '@/vuex/icon-library.store-module';
import { UsersStoreFetchUsersAction } from '@/vuex/users.store-module';

export default Vue.extend({
  name: 'app-app',
  components: {
    'login': LoginVue,
    'enemy-list': EnemyListVue,
    'game': GameVue
  },
  store: AppStoreObject,
  mounted: function() {
    this.$store.dispatch(new IconLibraryInitAction());
    this.$store.dispatch(new UsersStoreFetchUsersAction());
  },
  computed: {
    showEnemyList: function() {
      return !!this.$store.state.users.currentUser;
    },
    inGame: function() {
      return this.$store.getters.inGame;
    }
  }
});
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
