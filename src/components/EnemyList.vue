<template>
<div class="row">
  <div class="col-12 text-center">
    <h1>Wybierz przeciwnika</h1>
    <div class="enemy-name" 
    v-for="(enemy) in enemies" 
    v-bind:key="enemy.name"
    v-bind:class="hover === enemy.name ? 'hovered' : ''"
    v-on:click="choose_enemy(enemy.name)"
    v-on:mouseenter="hover = enemy.name">
      {{enemy.name}}
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'enemy-list',
  data: function() {
    return {
      hover: ''
    }
  },
  computed: {
    enemies: function () {
      return this.$store.getters.possibleEnemies;
    },
  },
  methods: {
    choose_enemy: function(userName: string) {
      this.$store.dispatch('chooseEnemy', userName)
    }
  }
})
</script>

<style lang="scss" scoped>
.enemy-name {
  margin-bottom: 20px;
  margin-top: 20px;
  font-size: 2.0em;
  font-weight: bold;
}
.hovered {
  background: gray;
}
</style>
