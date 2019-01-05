<template>
  <div id="app" class="container mt-1">
    <div class="row">
      <div class="col-12" v-if="showLoggingScreen">
        <login/>
      </div>
      <div class="col-12" v-if="showLobbyScreen">
        <interface/>
      </div>
      <div class="col-12" v-if="showGameScreen">
        <game/>
      </div>
      <div class="col-12" v-if="showFinishScreen">
        <aftermath/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostVue from "@/components/Post.vue";
import Axios from "axios";
import { AppStoreObject } from "./vuex/store";
import IconVue from "@/components/Icon.vue";
import EndTurnVue from "@/components/EndTurn.vue";
import StateVue from "@/components/State.vue";
import HandVue from "@/components/Hand.vue";
import LoginVue from "@/components/Login.vue";
import EnemyListVue from "@/components/EnemyList.vue";
import GameVue from "@/components/Game.vue";
import { IconLibraryInitAction } from "@/vuex/icon-library.store-module";
import AftermathVue from "@/components/Aftermath.vue";
import UserbioVue from "@/components/Userbio.vue";
import { PaletteLibraryInitAction } from "@/vuex/palette-library.store-module";
import InterfaceVue from "@/components/Interface.vue";

export default Vue.extend({
  name: "app-app",
  components: {
    login: LoginVue,
    interface: InterfaceVue,
    game: GameVue,
    aftermath: AftermathVue
  },
  store: AppStoreObject,
  mounted: function() {
    this.$store.dispatch(new IconLibraryInitAction());
    this.$store.dispatch(new PaletteLibraryInitAction());
  },
  computed: {
    showLoggingScreen: function() {
      return this.$store.getters.logging;
    },
    showLobbyScreen: function() {
      return this.$store.getters.lobby;
    },
    showGameScreen: function() {
      return this.$store.getters.game;
    },
    showFinishScreen: function() {
      return this.$store.getters.finish;
    }
  }
});
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
