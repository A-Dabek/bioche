<template>
  <div class="playable d-inline" draggable v-on:dragstart="on_drag" >
    <icon v-bind:path="playable.path"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconVue from '@/components/Icon.vue';
import {Playable} from '@/interface/playable';
export default Vue.extend({
  name: 'playable',
  components: {
    'icon': IconVue
  },
  props: {
    playable: {type: Object as () => Playable, default: null}
  },
  methods: {
    on_drag: function(event: any) {
      event.dataTransfer.setData('playable', JSON.stringify(this.playable));
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
