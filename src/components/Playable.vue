<template>
  <div class="playable d-inline" draggable v-on:dragstart="on_drag">
    <icon v-bind:name="name"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
import { Playable } from "@/core/playable";
export default Vue.extend({
  name: "playable",
  components: {
    icon: IconVue
  },
  props: {
    name: { type: String, default: "" }
  },
  methods: {
    on_drag: function(event: any) {
      this.$emit("drag", event);
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
