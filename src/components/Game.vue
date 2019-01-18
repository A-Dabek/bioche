<template>
  <div class="row game-root d-flex flex-row">
    <div class="col-12 align-self-start">
      <state v-bind:state="enemy.state" v-on:play="play_on_enemy"/>
      <hud v-bind:user="enemy" v-bind:turn="!myTurn"/>
    </div>
    <div class="col-12 hand flex-grow-1 align-self-stretch">
      <hand/>
    </div>
    <div class="col-12 align-self-end">
      <hud v-bind:user="user" v-bind:turn="myTurn"/>
      <state v-bind:state="user.state" v-on:play="play_on_user"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import HandVue from "@/components/Hand.vue";
  import StateVue from "@/components/State.vue";
  import {UsersStorePlayAction, UsersStoreStartGameAction} from "@/vuex/users.store-module";
  import {User} from "@/interface/user";
  import IconVue from "@/components/Icon.vue";
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
    min-height: 95vh;
}
</style>
