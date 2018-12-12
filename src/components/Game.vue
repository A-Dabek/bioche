<template>
  <div class="row">
    <div class="col-12">
      <state v-bind:state="enemyState"/>
    </div>
    <div class="col-12">
      <hand/>
    </div>
    <div class="col-12">
      <state v-bind:state="userState"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HandVue from '@/components/Hand.vue';
import StateVue from '@/components/State.vue';
export default Vue.extend({
  name: 'game',
  components: {
    'hand': HandVue,
    'state': StateVue
  },
  computed: {
    enemyState: function() {
      return this.$store.state.enemy.state || [];
    },
    userState: function() {
      return this.$store.state.user.state || [];
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
