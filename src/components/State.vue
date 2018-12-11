<template>
  <div class="state" v-on:dragover="allow_drop" v-on:drop="on_drop">
    <icon v-for="(i, index) of icons" v-bind:key="index" v-bind:path="i.path"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconVue from '@/components/Icon.vue';
import { Playable } from '@/interface/playable';
export default Vue.extend({
  name: 'state',
  components: {
    'icon': IconVue
  },
  computed: {
    icons: function() {
      return this.$store.state.playerState
    }
  },
  methods: {
    allow_drop: function (event: any) {
      event.preventDefault();
    },
    on_drop: function(event: any) {
      event.preventDefault();
      const playable = event.dataTransfer.getData('playable');
      this.$store.commit('addToState', JSON.parse(playable));
    }
  }
})
</script>

<style lang="scss" scoped>
.state {
  height: 200px;
  border: 1px solid black;
}
</style>
