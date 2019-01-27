<template>
  <div class="row">
    <div class="col">
      <span v-for="(element, index) of content" v-bind:key="index">
        <icon class="p-1" v-if="element.icon" v-bind:name="element.text" v-bind:sideSize="'25px'"></icon>
        <span v-else v-bind:class="element.className">{{element.text}}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import IconVue from "@/components/Icon.vue";
import { FirebaseIcon } from "../interface/firebase-icon";

export default Vue.extend({
  name: "line-for-description",
  components: {
    icon: IconVue
  },
  props: {
    code: {
      type: String,
      required: true
    }
  },
  computed: {
    content: function() {
      let _content = [] as {
        icon: boolean;
        text: string;
        className?: string;
      }[];
      let textBuffer = "";
      this.code.split(" ").forEach(i => {
        if (/{{[a-z_]+}}/.test(i)) {
          if (textBuffer.length > 0) {
            _content.push({
              icon: false,
              text: textBuffer,
              className: "p-1"
            });
            textBuffer = "";
          }
          const icon_name = i.substring(2, i.length - 2);
          const icon = this.getIcon(icon_name);
          _content.push(
            { icon: true, text: icon_name },
            { icon: false, text: icon.header, className: "font-weight-bold" }
          );
          return;
        } else textBuffer = `${textBuffer} ${i}`;
      });
      if (textBuffer.length > 0) {
        _content.push({ icon: false, text: textBuffer, className: "p-1" });
      }
      return _content;
    }
  },
  methods: {
    getIcon: function(name: string): FirebaseIcon {
      return this.$store.getters.getIcon(name);
    }
  }
});
</script>

<style lang="scss">
</style>


