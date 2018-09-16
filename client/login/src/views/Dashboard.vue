<template>
  <v-container flex fill-height>
    <v-navigation-drawer app v-model="sidenav">
      <v-toolbar flat class="transparent py-2">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-avatar size="45px">
              <v-avatar size="45px">
                <img src="@/assets/espol_tortuga2.png" alt="">
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ usuario.email }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile @click="logout">
          <v-list-tile-content>
            <v-list-tile-title>Cerrar Sesión</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark class="primary-espol">
      <v-toolbar-side-icon @click.stop="sidenav = !sidenav"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Peer Project Learning</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click.native="logout">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout row wrap align-center justify-center>
      <main v-if="loading" class="text-xs-center">
        <v-progress-circular indeterminate color="primary-espol"></v-progress-circular>
      </main>
      <v-flex xs12 v-if="usuario.paralelos.length === 0">
        <v-responsive :aspect-ratio="16/9">
          <v-card-text class="text-xs-center headline">
            No está registrado en ninguna materia.
          </v-card-text>
        </v-responsive>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center" v-for="paralelo in usuario.paralelos" :key="paralelo._id" v-else>
        <v-card raised hover class="card-materia" height="300px" width="300px">
          <v-card-title class="pt-5">
            <h3 class="text-xs-center mx-auto display-1">{{ paralelo.nombreMateria }}</h3>
          </v-card-title>
          <v-card-text class="headline">
            Paralelo {{ paralelo.nombreParalelo }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    mounted () {
      const token = localStorage.getItem('x-access-token')
      const email = localStorage.getItem('email')
      if (!token || !email) {
        this.$router.push('/')
      } else {
        this.obtenerUsuario(email)  
      }      
    },
    data () {
      return {
        sidenav: false,
        usuario: {
          nombres: '',
          apellidos: '',
          email: '',
          paralelos: []
        },
        loading: false
      }
    },
    methods: {
      obtenerUsuario (email) {
        this.loading = true
        this.$http.get(`/api/login/session/${email}`)
          .then((resp) => {
            this.usuario = resp.body.datos
            this.loading = false
          }, (err) => {
            console.log(err)
            this.loading = false
          })
      },
      logout () {
        localStorage.removeItem('x-access-token')
        localStorage.removeItem('email')
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  .card-materia {
    padding: 15px 15px 10px !important;
    flex: 1 1 auto !important;
    border-radius: 5%;
    display: inline-block;
  }
</style>