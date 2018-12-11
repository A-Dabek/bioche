<template>
  <div class="state">
    <icon v-for="(i, index) of icons" v-bind:key="index" v-bind:playable="i"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayableVue from '@/components/Playable.vue';
export default Vue.extend({
  name: 'hand',
  components: {
    'icon': PlayableVue
  },
  computed: {
    icons: function() {
      return this.$store.state.playerHand
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
