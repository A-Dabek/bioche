<template>
  <div id="app" class="container" v-bind:style="styleObject">
    <div class="row m-0">
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
  import {AppStoreObject} from "./vuex/store";
  import LoginVue from "@/components/Login.vue";
  import GameVue from "@/components/Game.vue";
  import {IconLibraryInitAction} from "@/vuex/icon-library.store-module";
  import AftermathVue from "@/components/Aftermath.vue";
  import {PaletteLibraryInitAction} from "@/vuex/palette-library.store-module";
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
    styleObject: function(): Object {
      const user = this.$store.state.users.user;
      if (!user) return {};
      const palette = this.$store.getters.getPalette(this.$store.state.users.user.palette);
      if (palette) return {
        color: palette.primary,
        background: palette.secondary
      };
    },
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
#app {
  min-width: 100vh;
  min-height: 100vh;
  margin: 0;
  padding-top: 10px;
  max-width: none;
}
</style>
