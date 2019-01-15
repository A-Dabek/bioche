<template>
  <div class="state">
    <draggable
            v-model="icons"
            v-bind:options="{group: {name: 'icons', pull: false, put: true}}"
            v-on:add="on_drop($event)"
    >
      <div class="row m-0">
        <div class="col-3 col-lg-2" v-for="(icon, index) of state" v-bind:key="index">
        <div class="row p-2">
          <div class="col-12 p-0">
            <icon
                v-bind:sideSize="'80%'"
                v-bind:name="icon.name"/>
          </div>
          <div class="col-3 col-lg-3 p-0" v-for="(effect, index) of listEffects(icon)" v-bind:key="index">
            <icon v-bind:sideSize="'90%'" v-bind:name="effect" v-bind:text="String(icon[effect])"/>
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
  import {RawState} from "../interface/raw-state";

  export default Vue.extend({
    name: "state",
    components: {
      icon: IconVue,
      draggable
    },
    props: {
      state: {
        type: Array as () => Array<RawState>,
        default: () => [] as RawState[]
      }
    },
    computed: {
      icons: {
        get(): RawState[] {
          return this.state;
        },
        set(v: RawState[]) {}
      }
    },
    methods: {
      on_drop: function(event: any) {
        this.$emit("play", event.oldIndex);
      },
      listEffects: function (state: RawState) {
        return Object.keys(state).filter(i => i !== 'name');
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
</style>
