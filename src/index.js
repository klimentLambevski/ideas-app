import Vue from 'vue';
require('./index.scss');
import App from './components/app/app.vue';

new Vue({
  components: {
    App
  },
  template: `<app></app>`
}).$mount('#r-boot');
