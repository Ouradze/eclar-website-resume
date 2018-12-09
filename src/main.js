import Vue from 'vue';
import VueMarkdown from 'vue-markdown';
import App from './components/App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.component('vue-markdown', VueMarkdown);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
