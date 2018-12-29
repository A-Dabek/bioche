<template>
  <div class="icon d-inline p-1" v-on:click="$emit('click')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style="min-height: 10px; max-height: 200px; height: 50px; min-width: 10px; max-width: 200px; width: 50px;"
    >
      <path d="M0 0h512v512H0z" fill="#fff" fill-opacity="1"></path>
      <g transform="translate(0,0)" style="touch-action: none;">
        <path v-bind:d="path" v-bind:fill="this.color" fill-opacity="1"></path>
      </g>
      <g
        v-if="count != null"
        font-family="Arial, Helvetica, sans-serif"
        font-size="120"
        font-style="normal"
        font-weight="bold"
        text-anchor="middle"
        class
        style="touch-action: none;"
        transform="translate(433,101)"
      >
        <text stroke="#000" stroke-width="30">
          <tspan x="0" y="0">{{count}}</tspan>
        </text>
        <text fill="#fff">
          <tspan x="0" y="0">{{count}}</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "icon",
  data: function() {
    return {};
  },
  props: {
    name: { type: String, default: "" },
    color: { type: String, default: "#000" },
    count: { type: Number, default: null }
  },
  computed: {
    path: function() {
      return this.$store.getters.getIcon(this.name).path;
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
