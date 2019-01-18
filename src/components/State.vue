<template>
  <div class="state">
    <draggable
            v-model="icons"
            v-bind:options="{group: {name: 'icons', pull: false, put: true}}"
            v-on:add="on_drop($event)"
    >
      <div class="row m-0">
        <div class="col" v-for="(icon, index) of state" v-bind:key="index">
        <div class="row p-2">
          <div class="col-12 p-0 beating" v-bind:class="icon.present.map(i => i.className).join(' ')">
            <icon
                v-on:click="show_desc(icon.name)"
                v-bind:sideSize="'80%'"
                v-bind:name="icon.name"/>
          </div>
          <div class="col-3 col-lg-3 p-0" v-for="(effect, index) of icon.present" v-bind:key="index">
            <icon
                    v-on:click="show_desc(effect.key)"
                    v-bind:sideSize="'90%'"
                    v-bind:name="effect.key"
                    v-bind:text="effect.value"/>
          </div>
        </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import IconVue from "@/components/Icon.vue";
  import draggable from "vuedraggable";
  import {FirebaseStatefulIcon} from "../interface/firebase-stateful-icon";
  import {IconStoreAction_ShowDescription} from "../vuex/icon-library.store-module";

  export default Vue.extend({
    name: "state",
    components: {
      icon: IconVue,
      draggable
    },
    props: {
      state: {
        type: Array as () => Array<FirebaseStatefulIcon>,
        default: () => [] as FirebaseStatefulIcon[]
      }
    },
    computed: {
      icons: {
        get(): FirebaseStatefulIcon[] {
          return this.state;
        },
        set(v: FirebaseStatefulIcon[]) {}
      }
    },
    methods: {
      on_drop: function(event: any) {
        this.$emit("play", event.oldIndex);
      },
      show_desc: function(name: string) {
        this.$store.commit(new IconStoreAction_ShowDescription(name));
      }
    }
  });
</script>

<style lang="scss" scoped>
  .state {
    min-height: 50px;
    border: 1px solid black;
    /*padding: 10px;*/
  }
  .beating {
    animation: alternate-reverse infinite beat 250ms;
  }
  .stop-beating {
    animation: none;
  }
  @keyframes beat {
    to {
      transform: scale(1.1)
    }
  }
</style>
