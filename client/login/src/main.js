import '@babel/polyfill'
import Vue from 'vue'
import VueResource from 'vue-resource'

import './plugins/vuetify'

import router from './router'
import App from './App.vue'

Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
