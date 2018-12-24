<template>
  <div class="root">
    <div class="description ml-3" v-if="showDesc">
      <description v-bind:icon_name="descriptionOf" v-on:dismiss="hide_desc"/>
    </div>
    <div class="hand" v-else>
      <draggable v-model="hand" v-bind:options="draggableOptions">
        <span v-for="(i, index) of hand" v-bind:key="index">
          <icon v-bind:name="i" v-on:click.native="show_desc(i)"/>
        </span>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Playable } from "@/core/playable";
import DescriptionVue from "@/components/Description.vue";
import { functions } from "firebase";
import draggable from "vuedraggable";
import IconVue from "@/components/Icon.vue";
import { UsersStorePermuteHandAction } from "@/vuex/users.store-module";
export default Vue.extend({
  name: "hand",
  data: function() {
    return {
      descriptionOf: "",
      showDesc: false
    };
  },
  components: {
    icon: IconVue,
    description: DescriptionVue,
    draggable
  },
  computed: {
    hand: {
      get(): string[] {
        return this.$store.getters.user.hand;
      },
      set(v: string[]) {
        this.$store.dispatch(new UsersStorePermuteHandAction(v));
      }
    },
    draggableOptions: function() {
      console.log(this.$store.getters.user.turn);
      return {
        group: { name: "icons", put: true, pull: true },
        sort: true,
        ghostClass: "ghost",
        disabled: !this.$store.getters.user.turn
      };
    }
  },
  methods: {
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
.ghost {
  opacity: 0.5;
}
</style>
