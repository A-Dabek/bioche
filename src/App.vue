<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-12">
        <login/>
      </div>
      <div class="col-12" v-if="showEnemyList">
        <enemy-list/>
      </div>
      <div class="col-12" v-if="showGame">
        <game/>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import PostVue from './components/Post.vue'
import Axios from 'axios'
import { AppStoreObject } from './vuex/store'
import IconVue from '@/components/Icon.vue';
import EndTurnVue from '@/components/EndTurn.vue';
import StateVue from '@/components/State.vue';
import HandVue from '@/components/Hand.vue';
import { CollectablePlayable, CollectableFirstPlayable } from '@/core/collectable.playable';
import { HarmfulPlayable } from '@/core/harmful.playable';
import { ProtectivePlayable } from '@/core/protective.playable';
import { Playable } from '@/core/playable';
import { ReactivePlayable } from '@/core/reactive-playable';
import LoginVue from '@/components/Login.vue';
import EnemyListVue from '@/components/EnemyList.vue';
import GameVue from '@/components/Game.vue';

export default Vue.extend({
  name: 'app',
  components: {
    'login': LoginVue,
    'enemy-list': EnemyListVue,
    'game': GameVue
  },
  store: AppStoreObject,
  mounted: function() {
    this.$store.dispatch('listenToUsersList')
  },
  computed: {
    showEnemyList: function() {
      return !!this.$store.state.user.name && !this.$store.state.user.playing
    },
    showGame: function() {
      return !!this.$store.state.user.playing
    }
  }
})
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
</style>
