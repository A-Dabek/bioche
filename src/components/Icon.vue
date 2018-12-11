<template>
  <div class="icon d-inline p-1" v-on:click="$emit('click')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 50px; width: 50px;">
      <path d="M0 0h512v512H0z" fill="#000" fill-opacity="1"></path>
      <g transform="translate(0,0)" style="touch-action: none;">
        <path v-bind:d="path" fill="#fff" fill-opacity="1"></path>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'icon',
  props: {
    path: {type: String, default: ''}
  },
})
</script>

<style lang="scss" scoped>

</style>
