import Vue from 'vue';
import AppVue from './App.vue';

Vue.config.productionTip = false;

const app = new Vue({
  render: h => h(AppVue)
});

app.$mount('#app');

// window.addEventListener('message', e => {
//   if ('production' !== process.env.NODE_ENV) {
//     console.clear();
//   }
// });
