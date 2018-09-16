<template>
  <main>
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
              <v-list-tile-title>{{ email }}</v-list-tile-title>
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
  </main>  
</template>
<script>
  export default {
    mounted () {
      const token = localStorage.getItem('x-access-token')
      const email = localStorage.getItem('email')
      this.email = email
      if (!token || !email) {
        this.$router.push('/')
      }     
    },
    data () {
      return {
        sidenav: false,
        email: ''
      }
    },
    methods: {
      logout () {
        localStorage.removeItem('x-access-token')
        localStorage.removeItem('email')
        this.$router.push('/')
      }  
    }    
  }
</script>