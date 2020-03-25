import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import PlaygroundState from './modules/playground';

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
  modules: {
    playground: PlaygroundState
  },
  plugins: [
    createPersistedState({
      key: 'XLangPlaygroundCode',
      paths: ['playground.codes']
    })
  ]
});
