<template>
  <div class="root">
    <ul class="nav nav-tabs">
      <li
        v-for="(tab, index) of tabs"
        v-bind:key="index"
        class="nav-item"
        v-on:click="activeTab = index"
      >
        <a class="nav-link" v-bind:class="activeTab === index ? 'active' : ''">
          <icon v-bind:name="tab.icon"/>
          {{tab.label}}
        </a>
      </li>
    </ul>
    <component v-bind:is="currentTabComponent"></component>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
import EnemyListVue from "@/components/EnemyList.vue";
import UserbioVue from "@/components/Userbio.vue";
import PalettesVue from "@/components/Palettes.vue";
export default Vue.extend({
  name: "interface",
  components: {
    icon: IconVue,
    enemyList: EnemyListVue,
    palettes: PalettesVue
  },
  data: function() {
    return {
      activeTab: 0,
      tabs: [
        { icon: "face_to_face", label: "Lobby" },
        { icon: "palette", label: "Palety" }
      ]
    };
  },
  computed: {
    currentTabComponent: function() {
      if (this.activeTab === 0) return "enemyList";
      if (this.activeTab === 1) return "palettes";
      return "";
    }
  }
});
</script>
<style lang="scss" scoped>
</style>