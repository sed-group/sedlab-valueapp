import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import vb from 'vue-babylonjs';
import store from './store'
import router from './router'

Vue.use(vb);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')