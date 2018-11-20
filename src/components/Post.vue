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
    <hr>
    <div id="actions" class="col-12">
      <div class="row">
        <div class="col-4">
          <fbl-reaction v-bind:icon="'thumbs-up'" v-bind:label="'like it'"/>
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
import ReactionVue from './Reaction.vue';
export default Vue.extend({
  name: 'fbl-post',
  props: {
    author: {type: String, default: 'default author'},
    description: {type: String, default: 'default content'},
  },
  components: {
    'fbl-reaction': ReactionVue
  }
})
</script>

<style lang="scss" scoped>
#post {
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
</style>
