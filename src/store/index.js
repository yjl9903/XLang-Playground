import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    width: document.body.clientWidth
  },
  mutations: {
    resize(state) {
      state.width = document.body.clientWidth;
    }
  },
  actions: {},
  modules: {}
});
