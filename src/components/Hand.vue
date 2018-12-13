<template>
  <div class="hand">
    <icon v-for="(i, index) of hand" v-bind:key="index" v-bind:name="i"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayableVue from '@/components/Playable.vue';
import { Playable } from '@/core/playable';
export default Vue.extend({
  name: 'hand',
  components: {
    'icon': PlayableVue
  },
  computed: {
    hand: function(): string[] {
      return this.$store.getters.user.hand;
    }
  }
})
</script>

<style lang="scss" scoped>
.hand {
  border: 1px solid black;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
