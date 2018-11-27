<template>
  <div class="row post">
    <div id="header" class="col-12">
      <table>
        <tbody>
          <tr>
            <td class="author-avatar">
              <img v-bind:src="props.thumbnailUrl">
            </td>
            <td class="author-info">
              <div><label class="author-name">Autor</label></div>
              <div><label class="post-timestamp">{{props.timestamp.toISOString().slice(0, 10)}}</label></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="description" class="col-12">
      <label>{{props.title}}</label>
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
    <div id="comments" class="col-12">
      <fbl-comments v-bind:postId="props.id"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ReactionVue from './Reaction.vue'
import LikeVue from './Like.vue'
import Axios from 'axios'
import { Post } from '../interface/post'
import { RandomUtils } from '@/utils/random';
import { FblComment } from '@/interface/fbl-comment';
import CommentsVue from '@/components/Comments.vue';

export default Vue.extend({
  name: 'fbl-post',
  props: {
    props: { type: Object as () => Post },
  },
  components: {
    'fbl-reaction': ReactionVue,
    'fbl-like': LikeVue,
    'fbl-comments': CommentsVue
  }
})
</script>

<style lang="scss" scoped>
.post {
  border: solid 1px lightgray;
  border-radius: 3px;
  hr {
    width: 95%;
    margin-top: 2%;
    margin-bottom: 2%;
  }
  #header {
    padding-top: 10px;
    img {
      width: 50px;
      border-radius: 50%;
    }
    .author-info {
      padding-left: 10px;
    }
    .author-name {
      font-weight: bold;
      color: mediumblue;
      margin: 0;
      font-size: 1.1em;
    }
    .post-timestamp {
      margin: 0;
      font-size: 0.8em;
    }
  }
  #description {
    padding-top: 5px;
  }
  #content {
    padding: 0;
    img {
      width: inherit;
    }
  }
  #actions {
    margin-bottom: 2%;
  }
}
</style>
