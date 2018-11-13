<template>
  <div id="app" class="container">
    <div class="row">
      <div id="posts" class="offset-3 col-6 offset-3">
        <fbl-post v-for="(post, index) of posts" v-bind:key="index" v-bind="post"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PostComponent from './components/Post.vue';

export default Vue.extend({
  name: 'app',
  data: () => {
    return {
      posts: [
        {author: 'Myszon Pyszon'},
        {author: 'Dąbkowiak Bombkowiak'},
      ]
    } 
  },
  components: {
    'fbl-post': PostComponent
  }
});
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
