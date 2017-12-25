import Vue from 'vue';
import VueRouter from 'vue-router';

require('./index.scss');
Vue.config.devtools = true;
Vue.use(VueRouter);

import {router} from "./routes.js";
import App from './components/app/app.vue';
import store from './store/store';

new Vue({
  router,
  store,
  components: {
    App
  },
  template: `<app></app>`
}).$mount('#r-boot');
