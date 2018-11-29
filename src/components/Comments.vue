<template>
  <div class="row">
    <div class="col-12 mb-3">
      <div class="comment-container">
        <div class="comment-avatar">
          <img v-bind:src="avatarUrl">
        </div>
        <div class="w-100">
          <div class="comment comment-user">
            <input class="comment-input" placeholder="Write a comment" v-on:keyup.enter="addComment"/>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="comment-container" v-for="(comment, index) in comments" v-bind:key="index">
        <div class="comment-avatar">
          <img v-bind:src="comment.thumbnailUrl">
        </div>
        <div>
          <div class="comment">
            <label class="author">{{comment.email}}</label>
            {{comment.body}}
          </div>
          <label class="reaction reaction-like">Like it</label>
          <label class="reaction reaction-comment">Comment</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CommentService } from '@/service/comment.service';
import Vue from 'vue'
import { FblComment } from '@/interface/fbl-comment';
export default Vue.extend({
  name: 'fbl-comments',
  props: {
    postId: {type: Number, default: 0}
  },
  data: function() {
    return {
      commentService: new CommentService(),
      photosPerComment: [] as string[]
    }
  },
  mounted: function() {
    this.$store.dispatch('getComments', this.postId);
    // this.commentService.getCommentsForPost(this.postId).then(comments => {
    //   this.comments = comments;
    //   this.photosPerComment = Array(this.comments.length).fill('');
    //   this.loadPhotos();
    // });
  },
  methods: {
    addComment: function(event: {target: HTMLInputElement}) {
      this.$store.dispatch('addComment', {postId: this.postId, body: event.target.value});
      event.target.value = '';
    }
  },
  computed: {
    comments(): FblComment[] {
      return this.$store.state.comments;
    },
    userName(): string {
      return this.$store.state.user.name;
    },
    avatarUrl(): NodeRequire {
      return require(`@/assets/${this.$store.state.user.thumbnailUrl}`);
    }
  }
})
</script>

<style lang="scss" scoped>
.comment-container {
  display: flex;
  margin-bottom: 10px;
}
.comment-avatar {
  img {
    border-radius: 50%;
    width: 40px;
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
.author {
  margin: 0;
  font-weight: bold;
  color: mediumblue;
}
.comment-user {
  padding: 10px;
  border: 1px solid gray;
}
.comment-input {
  background: lightgray;
  border: none;
  &:focus {
    outline: none;
  }
}
</style>
