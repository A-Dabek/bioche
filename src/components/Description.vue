<template>
  <div class="description row" v-on:click="dismiss">
    <div class="col-12">
      <div>
        <icon v-bind:name="icon_name"></icon>
        <label class="desc-label">{{icon.header}}</label>
      </div>
      <div>{{icon.description}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { functions } from "firebase";
import IconVue from "@/components/Icon.vue";
import { Icon } from "@/interface/icon";
export default Vue.extend({
  name: "description",
  components: {
    icon: IconVue
  },
  props: {
    icon_name: { type: String, default: "" }
  },
  computed: {
    icon: function(): Icon {
      return this.$store.getters.getIcon(this.icon_name);
    }
  },
  methods: {
    dismiss: function() {
      this.$emit("dismiss");
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


