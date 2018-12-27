<template>
  <div class="row">
    <div class="col-6">
      <icon v-if="!turn" v-bind:name="'hourglass'"/>
      <label class="name">{{user.name}}</label>
    </div>
    <div class="col-6">
      <icon v-if="!!user.lastPlay" v-bind:name="user.lastPlay"/>
      <label class="name">ostatnio zagrane</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "@/interface/user";
import IconVue from "@/components/Icon.vue";
export default Vue.extend({
  name: "hud",
  components: {
    icon: IconVue
  },
  props: {
    user: { type: Object as () => User },
    turn: { type: Boolean, default: false }
  }
});
</script>

<style lang="scss" scoped>
.name {
  margin-left: 10px;
  font-weight: bold;
  font-size: 1.5em;
}
</style>


