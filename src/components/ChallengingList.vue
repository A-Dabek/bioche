<template>
  <div class="root row">
    <div
      class="col-6"
      v-for="player of challengingMe"
      v-bind:key="player.name"
      v-on:click="choose_enemy(player.name)"
    >
      <icon v-bind:name="'swords_power'"/>
      <label class="bio-label ml-2">{{player.name}}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
import { functions } from "firebase";
import { LobbyStoreChallengeAction } from "@/vuex/lobby.store-module";
export default Vue.extend({
  name: "challenging-list",
  components: {
    icon: IconVue
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
.bio-label {
  font-size: 2em;
}
</style>
