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
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card raised hover class="card-materia" height="300px" width="300px">
          <v-card-title class="pt-5">
            <h3 class="text-xs-center mx-auto display-1">Física PRE</h3>
          </v-card-title>
          <v-card-text class="headline">
            Paralelo 2
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card raised hover class="card-materia" height="300px" width="300px">
          <v-card-title class="pt-5">
            <h3 class="text-xs-center mx-auto display-1">Química PRE</h3>
          </v-card-title>
          <v-card-text class="headline">
            Paralelo 5
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        sidenav: false,
        usuario: {
          nombres: 'Edison André',
          apellidos: 'Mora Cazar',
          email: 'edanmora@espol.edu.ec'
        }
      }
    },
    methods: {
      logout () {
        localStorage.removeItem('x-access-token')
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