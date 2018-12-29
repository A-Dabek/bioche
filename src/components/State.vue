<template>
  <div class="state">
    <draggable
      v-model="icons"
      v-bind:options="{group: {name: 'icons', pull: false, put: true}}"
      v-on:add="on_drop($event)"
    >
      <span v-for="(i, index) of state" v-bind:key="index">
        <icon
          v-bind:name="i.name"
          v-bind:count="i.durability"
          v-bind:color="i.active ? '#000' : '#777'"
        />
      </span>
    </draggable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
import draggable from "vuedraggable";
import { PlayableState } from "@/interface/playable-state";
export default Vue.extend({
  name: "state",
  components: {
    icon: IconVue,
    draggable
  },
  props: {
    state: {
      type: Array as () => Array<PlayableState>,
      default: () => [] as PlayableState[]
    }
  },
  computed: {
    icons: {
      get(): PlayableState[] {
        return this.state;
      },
      set(v: PlayableState[]) {}
    }
  },
  methods: {
    on_drop: function(event: any) {
      this.$emit("play", event.oldIndex);
    }
  }
});
</script>

<style lang="scss" scoped>
.state {
  min-height: 50px;
  border: 1px solid black;
  padding: 10px;
}
</style>
