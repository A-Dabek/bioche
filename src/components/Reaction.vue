<template>
  <div v-bind:class="this.hovered ? 'background' : ''" v-on:mouseenter="mouse_enter" v-on:mouseleave="mouse_leave">
    <table align="center">
      <tbody>
        <tr class="w-100">
          <td v-bind:class="faIcon"></td>
          <td class="label text-capitalize" v-bind:class="styleClass">{{label}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'fbl-reaction',
  props: {
    icon: {type: String, default: 'question'},
    label: {type: String, default: 'action'},
    styleClass: {type: String}
  },
  data: function() {
    return {
      faIcon: `fa fa-${this.icon}`,
      hovered: false
    }
  },
  methods: {
    mouse_enter: function() {
      this.hovered = true;
    },
    mouse_leave: function() {
      this.hovered = false;
    }
  },
  computed: {
  }
})
</script>

<style lang="scss" scoped>
.background {
  background: lightgrey;
}
.label {
  padding-left: 10px
}
</style>

