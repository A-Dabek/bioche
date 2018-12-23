<template>
  <div class="state" v-on:dragover="allow_drop" v-on:drop="on_drop">
    <icon v-for="(i, index) of state" v-bind:key="index" v-bind:name="i"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
export default Vue.extend({
  name: "state",
  components: {
    icon: IconVue
  },
  props: {
    state: { type: Array, default: () => [] }
  },
  methods: {
    allow_drop: function(event: any) {
      event.preventDefault();
    },
    on_drop: function(event: any) {
      event.preventDefault();
      this.$emit("play", event.dataTransfer.getData("playable"));
    }
  }
});
</script>

<style lang="scss" scoped>
.state {
  // min-height: 200px;
  border: 1px solid black;
  padding: 10px;
}
</style>
