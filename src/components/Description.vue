<template>
  <div class="description row" v-on:click="dismiss">
    <div class="col-12">
      <div>
        <icon v-bind:name="iconName"></icon>
        <label class="pl-2 desc-label">{{icon.header || icon.name}}</label>
      </div>
      <div class="mt-1">
        <div v-for="(desc, index) of description" v-bind:key="index">
          <lineForDescription v-bind:code="desc.code"></lineForDescription>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
import LineForDescriptionVue from "@/components/LineForDescription.vue";
import { IconStoreAction_HideDescription } from "../vuex/icon-library.store-module";
import { Description } from "../core/description/description";
import { GameService } from "../service/game-service";
import { DescriptiveIcon } from "../core/description/descriptive-icon";
import { FirebaseIcon } from "@/interface/firebase-icon";

export default Vue.extend({
  name: "description",
  components: {
    icon: IconVue,
    lineForDescription: LineForDescriptionVue
  },
  computed: {
    iconName: function(): string {
      return this.$store.state.library.descriptionOf;
    },
    icon: function(): FirebaseIcon {
      return this.$store.getters.getIcon(this.iconName);
    },
    description: function(): Description[] {
      const service = GameService.getInstance();
      const icon = (service.statefulLibrary[this.iconName] ||
        service.statelessLibrary[this.iconName])();
      return (icon as DescriptiveIcon).getDescription();
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


