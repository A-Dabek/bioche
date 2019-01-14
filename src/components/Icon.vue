<template>
  <div class="icon d-inline p-1" v-on:click="$emit('click')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      v-bind:style="{'width': sideSize, 'height': sideSize}"
    >
      <path d="M0 0h512v512H0z" v-bind:fill="background" fill-opacity="1"></path>
      <g transform="translate(0,0)" style="touch-action: none;">
        <path v-bind:d="path" v-bind:fill="stroke" fill-opacity="1"></path>
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
  import {Palette} from "@/interface/palette";

  export default Vue.extend({
  name: "icon",
  data: function() {
    return {};
  },
  props: {
    name: { type: String, default: "" },
    strokeColor: { type: String },
    backgroundColor: { type: String },
    count: { type: Number, default: null },
    sideSize: {type: String, default: '50px'}
  },
  computed: {
    path: function() {
      return this.$store.getters.getIcon(this.name).path;
    },
    palette: function(): Palette {
      return this.$store.getters.getPalette(
        this.$store.state.users.user.palette
      );
    },
    stroke: function() {
      return `#${this.strokeColor || this.palette.primary}`;
    },
    background: function() {
      return `#${this.backgroundColor || this.palette.secondary}`;
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
