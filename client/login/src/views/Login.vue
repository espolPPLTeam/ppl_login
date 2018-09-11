<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary-espol" style="border-bottom: 2px solid #F5b400">
      <v-toolbar-title class="mx-auto">Peer Project Learning</v-toolbar-title>
    </v-toolbar>
    <!--<v-responsive style="background-color: #eee">
      <img src="@/assets/logo_espol.png" height="75px" class="mx-auto">
    </v-responsive>-->
    <v-card-text class="mt-3">
      <v-form>
        <v-text-field prepend-icon="person" name="login" label="Correo" type="text" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
        <v-text-field prepend-icon="lock" name="password" label="Contraseña" id="password" type="password" v-model="password" :rules="[rules.required]"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="mx-auto pb-3" style="justify-content: center;">
      <v-container grid-list-xl fluid>
        <v-layout wrap class="text-xs-center">
          <v-flex xs12 sm6>
            <v-btn class="primary-espol" :loading="loading" :disabled="disabled" @click.native="login">Iniciar sesión</v-btn>
          </v-flex>
          <v-flex xs12 sm6>
            <v-menu offset-y>
              <v-btn class="btn-registrar" slot="activator">Registrar</v-btn>
              <v-list>
                <v-list-tile @click="registroProfesor">
                  <v-list-tile-title>Profesor</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="registroEstudiante">
                  <v-list-tile-title>Estudiante</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-container>
      
      <!--<v-btn class="btn-registrar">Registrar</v-btn>-->
      
    </v-card-actions>
    <!--<v-card-actions class="mt-3">
      <p class="mx-auto">¿No tienes usuario? <a href="/registro"> Regístrate aquí!</a></p>      
    </v-card-actions>-->
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        email: "",
        password: "",
        loading: false,
        rules: {
          required: (value) => !!value || 'Este campo es obligatorio.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email inválido'
          }
        }
      }
    },
    computed: {
      disabled () {
        return this.email === '' || this.email === undefined || !this.email || this.password === '' || this.password === undefined || !this.password || this.loading
      }
    },
    methods: {
      login () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 3000)
      },
      registroProfesor () {
        this.$router.push('/registro/profesor')
      },
      registroEstudiante () {
        this.$router.push('/registro/estudiante')
      }
    }
  }
</script>
<style scoped>
  button {
    width: 150px !important;
  }
  .btn-registrar {
    background-color: white !important;
    color: #001C43 !important;
  }
</style>
