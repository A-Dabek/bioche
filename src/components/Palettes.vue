<template>
  <div class="root row">
    <div class="col-12">
      <icon v-bind:name="'palette'"/>
      <label class="bio-label ml-2">{{palette.name}}</label>
    </div>
    <div class="col-6" v-for="p of palettes" v-bind:key="p.name">
      <icon
        v-bind:name="'palette'"
        v-bind:strokeColor="p.primary"
        v-bind:backgroundColor="p.secondary"
      />
      <label v-on:click="pickPalette(p.name)" class="bio-label ml-2">{{p.name}}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
import { Palette } from "@/interface/palette";
import { UsersStoreSetPalette } from "@/vuex/users.store-module";
import { functions } from "firebase";
export default Vue.extend({
  components: {
    icon: IconVue
  },
  data: function() {
    return {};
  },
  computed: {
    palette: function(): Palette {
      return this.$store.getters.getPalette(
        this.$store.state.users.user.palette
      );
    },
    palettes: function(): Palette[] {
      return Object.values(this.$store.state.palettes.library);
    }
  },
  methods: {
    pickPalette: function(name: string) {
      this.$store.dispatch(new UsersStoreSetPalette(name));
    }
  }
});
</script>

<style lang="scss" scoped>
.bio-label {
  font-size: 2em;
}
</style>