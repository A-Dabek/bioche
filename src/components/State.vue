<template>
  <div class="state">
    <draggable
      v-model="icons"
      v-bind:options="{group: {name: 'icons', pull: false, put: true}}"
      v-on:add="on_drop($event)"
    >
      <span v-for="(i, index) of state" v-bind:key="index">
        <icon v-bind:name="i"/>
      </span>
    </draggable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
import draggable from "vuedraggable";
export default Vue.extend({
  name: "state",
  components: {
    icon: IconVue,
    draggable
  },
  props: {
    state: { type: Array as () => Array<string>, default: () => [] as string[] }
  },
  computed: {
    icons: {
      get(): string[] {
        return this.state;
      },
      set(v: string[]) {}
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
