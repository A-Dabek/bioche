<template>
  <div class="description row" v-on:click="dismiss">
    <div class="col-12">
      <div>
        <icon v-bind:name="iconName"></icon>
        <label class="desc-label">{{iconName}} {{icon.header}}</label>
      </div>
      <div>{{icon.description}}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import IconVue from "@/components/Icon.vue";
  import {Icon} from "@/interface/icon";
  import {IconStoreAction_HideDescription} from "../vuex/icon-library.store-module";

  export default Vue.extend({
  name: "description",
  components: {
    icon: IconVue
  },
  computed: {
    iconName: function(): string {
      return this.$store.state.library.descriptionOf;
    },
    icon: function(): Icon {
      return this.$store.getters.getIcon(this.iconName);
    }
  },
  methods: {
    dismiss: function() {
      this.$store.commit(new IconStoreAction_HideDescription());
    }
  }
});
</script>

<style lang="scss">
.desc-label {
  font-weight: bold;
  font-size: 2em;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0px;
}
</style>


