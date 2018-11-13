<template>
  <div id="post" class="row">
    <div id="header" class="col-6 align-left">
      {{author}}
    </div>
    <div id="description" class="col-12">
      {{description}}
    </div>
    <div id="content" class="col-12">
      no content yet
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'fbl-post',
  props: {
    author: {type: String, default: 'default author'},
    description: {type: String, default: 'default content'},
  }
})
</script>

<style lang="scss" scoped>
</style>
