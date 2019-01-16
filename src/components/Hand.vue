<template>
  <div class="root">
    <div class="description ml-3" v-if="showDescription">
      <description/>
    </div>
    <div class="hand" v-else>
      <draggable v-model="hand" v-bind:options="draggableOptions">
        <div style="display: inline-block" v-for="(i, index) of hand" v-bind:key="index">
          <icon v-bind:name="i" v-on:click.native="show_desc(i)"/>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import DescriptionVue from "@/components/Description.vue";
  import draggable from "vuedraggable";
  import IconVue from "@/components/Icon.vue";
  import {UsersStorePermuteHandAction} from "@/vuex/users.store-module";
  import {IconStoreAction_ShowDescription} from "../vuex/icon-library.store-module";

  export default Vue.extend({
  name: "hand",
  components: {
    icon: IconVue,
    description: DescriptionVue,
    draggable
  },
  computed: {
    hand: {
      get(): string[] {
        return this.$store.state.users.user.hand;
      },
      set(v: string[]) {
        this.$store.dispatch(new UsersStorePermuteHandAction(v));
      }
    },
    draggableOptions: function() {
      return {
        group: { name: "icons", put: true, pull: true },
        sort: true,
        ghostClass: "ghost",
        dragClass: "drag",
        disabled: !this.$store.getters.myTurn
      };
    },
    showDescription: function(): boolean {
      return this.$store.state.library.showDescription
    },
  },
  methods: {
    show_desc: function(name: string) {
      this.$store.commit(new IconStoreAction_ShowDescription(name));
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
  opacity: 0;
  width: 0;
  height: 0;
}
.drag {
  opacity: 1;
}
</style>
