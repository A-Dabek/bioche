<template>
  <fbl-reaction v-bind:icon="'thumbs-up'" v-bind:label="'like it'" v-bind:styleClass="styleClass" v-on:click.native="on_click"/>
</template>

<script lang="ts">
import Vue from 'vue'
import ReactionVue from './Reaction.vue';
export default Vue.extend({
  name: 'fbl-like',
  components: {
    'fbl-reaction': ReactionVue
  },
  data: function() {
    return {
      liked: false
    }
  },
  methods: {
    on_click: function() {
      this.liked = !this.liked;
    }
  },
  computed: {
    styleClass: function () {
      return this.liked ? 'font-weight-bold' : ''
    }
  }
})
</script>

<style lang="scss" scoped>
.font-weight-bold {
  font-weight: bold
}
</style>



