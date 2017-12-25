import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

import self from './modules/self';
import ideas from './modules/ideas';

export default new Vuex.Store({
  modules: {
    self,
    ideas
  },
  strict: debug,
})
