import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import RegistroProfesor from './views/RegistroProfesor.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/registro/profesor',
      name: 'RegistroProfesor',
      component: RegistroProfesor
    }
  ]
})
