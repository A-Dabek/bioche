<template>
  <div v-bind:class="this.hovered ? 'background' : ''">
    <table align="center" v-on:mouseenter="mouse_enter" v-on:mouseleave="mouse_leave">
      <tbody>
        <tr class="w-100">
          <td v-bind:class="faIcon"></td>
          <td class="label text-capitalize">{{label}}</td>
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
  padding-left: 10%
}
</style>

