<template>
  <div class="root">
    <div class="description ml-3" v-if="showDesc">
      <description v-bind:icon_name="descriptionOf" v-on:dismiss="hide_desc"/>
    </div>
    <div class="hand" v-else>
      <icon
        v-for="(i, index) of hand"
        v-bind:key="index"
        v-bind:name="i"
        v-on:click.native="show_desc(i)"
        v-on:drag="on_drag($event, index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PlayableVue from "@/components/Playable.vue";
import { Playable } from "@/core/playable";
import DescriptionVue from "@/components/Description.vue";
import { functions } from "firebase";
export default Vue.extend({
  name: "hand",
  data: function() {
    return {
      descriptionOf: "",
      showDesc: false
    };
  },
  components: {
    icon: PlayableVue,
    description: DescriptionVue
  },
  computed: {
    hand: function(): string[] {
      return this.$store.getters.user.hand;
    }
  },
  methods: {
    on_drag: function(event: any, index: number) {
      event.dataTransfer.setData("playable", index);
    },
    show_desc: function(name: string) {
      this.showDesc = true;
      this.descriptionOf = name;
    },
    hide_desc: function() {
      this.showDesc = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.root {
  border: 1px solid black;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
