<template>
  <div class="icon d-inline p-1" v-on:click="$emit('click')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      v-bind:style="{'width': sideSize, 'height': sideSize}"
    >
      <path d="M0 0h512v512H0z" fill-opacity="0"></path>
      <g transform="translate(0,0)" style="touch-action: none;">
        <path v-bind:d="path" v-bind:fill="stroke" fill-opacity="1"></path>
      </g>
      <g
        v-if="text != null"
        font-family="Arial, Helvetica, sans-serif"
        font-size="250"
        font-style="normal"
        font-weight="bold"
        text-anchor="start"
        class
        style="touch-action: none;"
        transform="translate(0,480)"
      >
        <text stroke="#000" stroke-width="30">
          <tspan x="0" y="0">{{text}}</tspan>
        </text>
        <text fill="#fff">
          <tspan x="0" y="0">{{text}}</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import {FirebasePalette} from "../interface/firebase-palette";

  export default Vue.extend({
  name: "icon",
  data: function() {
    return {};
  },
  props: {
    name: {type: String, default: ""},
    strokeColor: {
      type: String,
      validator: function (value) {
        return /^[0-9a-fA-F]+$/.test(value);
      }
    },
    backgroundColor: {
      type: String,

      validator: function (value) {
        return /^[0-9a-fA-F]+$/.test(value);
      }
    },
    text: {type: String},
    sideSize: {type: String, default: '50px'}
  },
  computed: {
    path: function() {
      return this.$store.getters.getIcon(this.name).path;
    },
    paletteSvg: function(): FirebasePalette {
      return this.$store.getters.getPalette(
        this.$store.state.users.user.palette
      );
    },
    stroke: function() {
      return `#${this.strokeColor || this.paletteSvg.primary}`;
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
