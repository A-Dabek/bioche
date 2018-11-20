<template>
  <div id="app" class="container">
    <div class="row">
      <div id="posts" class="offset-3 col-6 offset-3">
        <fbl-post class="main-post" v-for="(post, index) of posts" v-bind:key="index" v-bind="post"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PostVue from './components/Post.vue';

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
    'fbl-post': PostVue
  }
});
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
#posts .main-post {
  margin-bottom: 3% 
}
</style>
