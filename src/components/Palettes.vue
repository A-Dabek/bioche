<template>
  <div class="root row mt-1">
    <div class="col-6 p-1" v-for="p of palettes" v-bind:key="p.name" v-on:click="pickPalette(p.idDoc)">
      <div class="pb-1" v-bind:style="{'background': `#${p.secondary}`}">
        <icon
                v-bind:name="'palette'"
                v-bind:strokeColor="p.primary"
                v-bind:backgroundColor="p.secondary"
        />
        <label class="bio-label ml-2">{{p.name}}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import IconVue from "@/components/Icon.vue";
  import {Palette} from "@/interface/palette";
  import {UsersStoreSetPalette} from "@/vuex/users.store-module";

  export default Vue.extend({
  components: {
    icon: IconVue
  },
  computed: {
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