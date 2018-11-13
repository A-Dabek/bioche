<template>
  <div id="post">
    <div id="header">
      {{author}}
    </div>
    <div id="description">
      {{description}}
    </div>
    <div id="content">
      no content yet
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Post',
  props: {
    author: {type: String, default: 'default author'},
    description: {type: String, default: 'default content'},
  }
})
</script>

<style lang="postcss" scoped>

</style>
