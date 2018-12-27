<template>
  <div class="row game-root">
    <div class="col-12 header-state game-content">
      <state v-bind:state="enemy.state" v-on:play="play_on_enemy"/>
      <hud v-bind:user="enemy" v-bind:turn="!myTurn"/>
    </div>
    <div class="col-12 hand game-content">
      <hand/>
    </div>
    <div class="col-12 footer-state">
      <hud v-bind:user="user" v-bind:turn="myTurn"/>
      <state v-bind:state="user.state" v-on:play="play_on_user"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HandVue from "@/components/Hand.vue";
import StateVue from "@/components/State.vue";
import {
  UsersStoreStartGameAction,
  UsersStorePlayAction
} from "@/vuex/users.store-module";
import { User } from "@/interface/user";
import IconVue from "@/components/Icon.vue";
import { functions } from "firebase";
import HudVue from "@/components/Hud.vue";
export default Vue.extend({
  name: "game",
  components: {
    hand: HandVue,
    state: StateVue,
    icon: IconVue,
    hud: HudVue
  },
  computed: {
    myTurn: function(): boolean {
      return this.$store.getters.myTurn;
    },
    enemy: function(): User {
      return this.$store.state.users.enemy;
    },
    user: function(): User {
      return this.$store.state.users.user;
    }
  },
  methods: {
    play_on_user: function(index: number) {
      this.$store.dispatch(
        new UsersStorePlayAction(Number(index), this.user.name)
      );
    },
    play_on_enemy: function(index: number) {
      this.$store.dispatch(
        new UsersStorePlayAction(Number(index), this.enemy.name)
      );
    }
  }
});
</script>

<style lang="scss" scoped>
.game-root {
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  display: flex;
  flex-direction: column;
  min-height: 95vh;
}
.game-content {
  flex: 1;
}
</style>
