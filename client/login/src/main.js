import '@babel/polyfill'
import Vue from 'vue'
import VueResource from 'vue-resource'

import './plugins/vuetify'

import router from './router'
import App from './App.vue'

import RegistroMateria from './components/RegistroMateria.vue'
import Navbar from './components/Navbar.vue'

Vue.component('registro-materia', RegistroMateria)
Vue.component('navbar', Navbar)

Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
