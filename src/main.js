import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/common.css';
import './plugins/element.js';

Vue.config.productionTip = false;

window.addEventListener('resize', () => store.commit('resize'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
