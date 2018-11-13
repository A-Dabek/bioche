<template>
  <div id="app">
    <div id="posts">s
      <fbl-post v-for="(post, index) of posts" v-bind:key="index" v-bind="post"/>
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

<style>
#posts {
  text-align: center
}
</style>
