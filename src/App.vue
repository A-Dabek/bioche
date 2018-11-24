<template>
  <div id="app" class="container">
    <div class="row">
      <div id="posts" class="offset-3 col-6 offset-3">
        <fbl-post class="main-post" v-for="(post, index) of posts" v-bind:key="index" v-bind:props="post"/>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import PostVue from './components/Post.vue'
import Axios from 'axios'
import { Post } from './interface/post'
import { RandomUtils } from './utils/random'

export default Vue.extend({
  name: 'app',
  components: {
    'fbl-post': PostVue
  },
  data: () => {
    return {
      posts: [] as Post[]
    }
  },
  mounted: function () {
    Axios
      .get<Post[]>('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        this.posts = response.data
          .filter(i => i.id < 20)
          .map(i => ({ ...i, timestamp: RandomUtils.randomDate() }))
      })
  }
})
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
#posts .post {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
