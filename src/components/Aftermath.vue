<template>
  <div class="row" v-on:click="back_to_lobby">
    <div clas="col-12">
      <h1>Zwyciężyl {{winner}}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { functions } from "firebase";
import {
  NavigationMutationGoTo,
  NavigationEnum
} from "@/vuex/navigation.store";
import { LobbyStoreEnterAction } from "@/vuex/lobby.store-module";
export default Vue.extend({
  name: "aftermath",
  computed: {
    winner: function(): string {
      return this.$store.state.users.user.winner;
    },
    me: function(): string {
      return this.$store.state.users.user.name;
    }
  },
  methods: {
    back_to_lobby: function() {
      this.$store.dispatch(new LobbyStoreEnterAction(this.me));
    }
  }
});
</script>

<style lang="scss">
</style>
