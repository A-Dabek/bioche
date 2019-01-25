<template>
    <div class="row">
        <div class="col">
            <span v-for="(element) of content">
                <icon class="p-1" v-if="element.icon" v-bind:name="element.text" v-bind:sideSize="'25px'"></icon>
                <span v-else v-bind:class="element.className">{{element.text}}</span>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import IconVue from "@/components/Icon.vue";
  import {Icon} from "@/interface/icon";
  import {FirebaseIcon} from "../interface/firebase-icon";

  export default Vue.extend({
    name: "line-for-description",
    components: {
      icon: IconVue
    },
    data: function () {
      return {
        content: [] as { icon: boolean, text: string, className?: string }[]
      }
    },
    props: {
      code: {
        type: String,
        required: true
      }
    },
    mounted: function () {
      this.code
        .split(' ')
        .forEach(i => {
          if (/{{[a-z_]+}}/.test(i)) {
            const icon_name = i.substring(2, i.length - 2);
            const icon = this.getIcon(icon_name);
            this.content.push(
              {icon: true, text: icon_name},
              {icon: false, text: icon.header, className: 'font-weight-bold'},
            );
            return
          } else {
            return this.content.push({icon: false, text: i, className: 'p-1'});
          }
        });
    },
    methods: {
      getIcon: function (name: string): FirebaseIcon {
        return this.$store.getters.getIcon(name);
      }
    }
  });
</script>

<style lang="scss">
</style>


