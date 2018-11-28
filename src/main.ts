import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);
Vue.config.productionTip = false

const app = new Vue({
  render: h => h(App)
})

app.$mount('#app')
