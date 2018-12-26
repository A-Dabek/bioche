<template>
  <div class="row">
    <div class="col-6">
      <h1>Wybierz przeciwnika</h1>
      <div
        class="enemy-name"
        v-for="(enemy) in toBeChallenged"
        v-bind:key="enemy.name"
        v-on:click="choose_enemy(enemy.name)"
      >
        {{enemy.name}}
        <icon v-if="challengedByMe === enemy.name" v-bind:name="'swords_power'"/>
      </div>
    </div>
    <div class="col-6">
      <h1>Chcą grać z Tobą</h1>
      <div
        class="enemy-name"
        v-for="(enemy) in challengingMe"
        v-bind:key="enemy.name"
        v-on:click="choose_enemy(enemy.name)"
      >{{enemy.name}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
import { functions } from "firebase";
import { LobbyStoreChallengeAction } from "@/vuex/lobby.store-module";
export default Vue.extend({
  name: "enemy-list",
  components: {
    icon: IconVue
  },
  data: function() {
    return {};
  },
  computed: {
    challengedByMe: function() {
      return this.$store.state.users.user.challenging;
    },
    toBeChallenged: function() {
      return this.$store.state.lobby.availableUsers;
    },
    challengingMe: function() {
      return this.$store.state.lobby.challengingMeUsers;
    }
  },
  methods: {
    choose_enemy: function(userName: string) {
      this.$store.dispatch(new LobbyStoreChallengeAction(userName));
    }
  }
});
</script>

<style lang="scss" scoped>
.enemy-name {
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 2em;
  font-weight: bold;
}
</style>
