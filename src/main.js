// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index.js';
import Vuex from 'vuex';
import 'ant-design-vue/dist/antd.css';
import 'babel-polyfill';
import Antd from 'ant-design-vue';
import api from './http/index';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Antd);
Vue.use(api);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
