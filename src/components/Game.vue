<template>
  <div class="row">
    <div class="col-12">
      <state v-bind:state="enemy.state" v-on:play="play_on_enemy"/>
    </div>
    <div class="col-12">
      <hand/>
    </div>
    <div class="col-12">
      <state v-bind:state="user.state" v-on:play="play_on_user"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HandVue from '@/components/Hand.vue';
import StateVue from '@/components/State.vue';
import { UsersStoreStartGameAction, UsersStorePlayAction } from '@/vuex/users.store-module';
import { User } from '@/interface/user';
export default Vue.extend({
  name: 'game',
  components: {
    'hand': HandVue,
    'state': StateVue
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
    play_on_user: function(icon: string) {
      this.$store.dispatch(new UsersStorePlayAction(icon, this.user.name));
    },
    play_on_enemy: function(icon: string) {
      this.$store.dispatch(new UsersStorePlayAction(icon, this.enemy.name));
    },
  }
})
</script>

<style lang="scss" scoped>

</style>
