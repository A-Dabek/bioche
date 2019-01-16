<template>
  <div class="row">
    <div class="col-6" >
      <label v-if="!turn" class="spin">
        <icon v-bind:name="'hourglass'"/>
      </label>
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
  import {User} from "@/interface/user";
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
.spin {
  animation-name: spin;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
@keyframes spin {
    0% {
      transform:rotate(0deg);
    }
    25% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(180deg);
    }
}
</style>


