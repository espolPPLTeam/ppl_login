import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import RegistroProfesor from './views/RegistroProfesor.vue'
import RegistroEstudiante from './views/RegistroEstudiante.vue'
import RegistroMaterias from './views/RegistroMaterias.vue'
import Dashboard from './views/Dashboard.vue'

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
    },
    {
      path: '/registro/estudiante',
      name: 'RegistroEstudiante',
      component: RegistroEstudiante
    },
    {
      path: '/registro/estudiante/:email_estudiante/materias',
      name: 'RegistroMaterias',
      component: RegistroMaterias
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
