<template>
  <div class="row" v-on:click="back_to_lobby">
    <div clas="col-12">
      <h1>Zwyciężyl {{winner ? winner.name : ''}}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "@/interface/user";
import { functions } from "firebase";
import {
  NavigationMutationGoTo,
  NavigationEnum
} from "@/vuex/navigation.store";
export default Vue.extend({
  name: "aftermath",
  computed: {
    winner: function(): User | null {
      return this.$store.getters.winner;
    }
  },
  methods: {
    back_to_lobby: function() {
      this.$store.commit(new NavigationMutationGoTo(NavigationEnum.lobby));
    }
  }
});
</script>

<style lang="scss">
</style>
