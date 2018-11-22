<template>
  <div class="row post">
    <div id="header" class="col-6 align-left">
    </div>
    <div id="description" class="col-12">
      {{props.title}}
    </div>
    <div id="content" class="col-12">
      <img v-bind:src="props.url"/>
    </div>
    <hr>
    <div id="actions" class="col-12">
      <div class="row">
        <div class="col-4">
          <fbl-like/>
        </div>
        <div class="col-4">
          <fbl-reaction v-bind:icon="'comment'" v-bind:label="'comment'"/>
        </div>
        <div class="col-4">
          <fbl-reaction v-bind:icon="'share-square'" v-bind:label="'share'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ReactionVue from './Reaction.vue'
import LikeVue from './Like.vue'
import Axios from 'axios'
import { Post } from '../interface/post'

export default Vue.extend({
  name: 'fbl-post',
  props: {
    props: { type: Object as () => Post }
  },
  components: {
    'fbl-reaction': ReactionVue,
    'fbl-like': LikeVue
  }
})
</script>

<style lang="scss" scoped>
.post {
  border: solid 1px lightgray;
  border-radius: 2%;
}
hr {
  width: 95%;
  margin-top: 2%;
  margin-bottom: 2%;
}
#actions {
  margin-bottom: 2%;
}
#content img {
  width: inherit;
}
</style>
