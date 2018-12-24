<template>
  <div class="row">
    <div class="col-12 header-state">
      <state v-bind:state="enemy.state" v-on:play="play_on_enemy"/>
      <div>
        <icon v-if="!enemy.turn" v-bind:name="'hourglass'"/>
        <label class="name">{{enemy.name}}</label>
      </div>
    </div>
    <div class="col-12 hand">
      <hand/>
    </div>
    <div class="col-12 footer-state">
      <div>
        <icon v-if="!user.turn" v-bind:name="'hourglass'"/>
        <label class="name">{{user.name}}</label>
      </div>
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
export default Vue.extend({
  name: "game",
  components: {
    hand: HandVue,
    state: StateVue,
    icon: IconVue
  },
  mounted: function() {
    this.$store.dispatch(new UsersStoreStartGameAction());
  },
  computed: {
    enemy: function(): User {
      return this.$store.getters.enemy;
    },
    user: function(): User {
      return this.$store.getters.user;
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
.row {
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  display: flex;
  flex-direction: column;
  min-height: 95vh;
}
.hand,
.header-state {
  flex: 1;
}
.name {
  margin-left: 10px;
  font-weight: bold;
  font-size: 2em;
}
</style>
