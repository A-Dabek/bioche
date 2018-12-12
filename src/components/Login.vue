<template>
  <div class="col-12 mt-2">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Podaj swoją nazwę" aria-label="Recipient's username" aria-describedby="basic-addon2"
      v-on:keyup.enter="log_in_user"
      v-bind:readonly="loggedIn"
      v-model="input_value">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button"
        v-on:click="log_in_user"
        v-bind:disabled="loggedIn"
        >Zaloguj</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'login',
  data: function() {
    return {
      input_value: ''
    }
  },
  methods: {
    log_in_user: function() {
      this.$store.dispatch('addUserToFirebase', this.input_value);
    }
  },
  computed: {
    loggedIn: function() {
      if (!!this.$store.state.user.name) {
        this.input_value = `Zalogowano jako ${this.$store.state.user.name}`
      }
      return !!this.$store.state.user.name
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
