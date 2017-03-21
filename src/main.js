import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'components/app';
import router from './router';
import Jpex from 'jpex/dist/jpex';
import plugin from 'jpex-web/dist/jpex-web';
require('sass/styles.scss');

Jpex.use(plugin);

Vue.use(VueRouter);

new Vue({
  el : '#app',
  render : h => h(App),
  router
});
