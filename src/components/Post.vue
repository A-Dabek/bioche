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
      <div class="comment-container" v-for="(comment, index) in comments" v-bind:key="index">
        <div class="comment-avatar">
          <img v-bind:src="props.thumbnailUrl">
        </div>
        <div>
          <div class="comment">
            {{comment.content}}
          </div>
          <label class="reaction reaction-like">Like it</label>
          <label class="reaction reaction-comment">Comment</label>
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
import { RandomUtils } from '@/utils/random';
import { FblComment } from '@/interface/fbl-comment';

export default Vue.extend({
  name: 'fbl-post',
  props: {
    props: { type: Object as () => Post },
    comments: { type: Array as () => Array<FblComment>, default: function() {
      return <FblComment[]>[
        {author: '', content: 'as alkjsdlka slk jhlkjljfd; lkhaklkwjpo  s afjduoiosafkj shrd dhsakdhak hdsja hkjsadh kdjlashkdj ajkdhas d', timestamp: RandomUtils.randomDate()},
        {author: '', content: 'asfhdssdhjf sldhfhjklshdjfh sjklhf sldhfshd fjfgh', timestamp: RandomUtils.randomDate()},
        {author: '', content: 'sdlkfsd kjsdfh jkdshfkljs hfksdhkfls', timestamp: RandomUtils.randomDate()},
      ]}
    }
  },
  components: {
    'fbl-reaction': ReactionVue,
    'fbl-like': LikeVue
  },
  computed: {
    showComments: function(): boolean {
      return this.comments.length > 0
    }
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
  #comments {
    .comment-container {
      display: flex;
      margin-bottom: 10px;
    }
    .comment-avatar {
      img {
        width: 40px
      }
    }
    .comment {
      margin-left: 10px;
      background: lightgray;
      border-radius: 20px;
      padding: 10px;
    }
    .reaction {
      font-size: 0.9em;
      color: mediumblue;
      font-weight: bold;
    }
    .reaction-like {
      margin-left: 25px;
    }
    .reaction-comment {
      margin-left: 10px;
    }
  }
}
</style>
