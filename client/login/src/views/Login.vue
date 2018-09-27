<style scoped>
  button {
    width: 150px !important;
  }
  .btn-registrar {
    background-color: white !important;
    color: #001C43 !important;
  }
  .loginBar {
    border-bottom: 2px solid #F5b400;
    position: relative;   
  }
  .loginBar:before {
    content: "";
    position: absolute;
    top: 0%;
    right: 0%;
    width: 0px;
    height: 0px;
    border-top: 69px solid #001C43;
    border-right: 69px solid #FFFFFF;
    -webkit-box-shadow: -5px -1px 1px rgba(0,0,0,0.3);
    -moz-box-shadow: -5px -1px 1px rgba(0,0,0,0.3);
    box-shadow: -5px -1px 1px rgba(0,0,0,0.3)
  }
  .loginBar:after {
    content: "";
    position: absolute;
    top: 0%;
    right: 0%;
    width: 0px;
    height: 0px;
    border-bottom: 75px solid #FFFFFF; 
    border-left: 75px solid transparent;
  }
  @media only screen and (max-width: 600px) {
    .loginBar {
    border-bottom: 2px solid #F5b400;
    position: relative;   
  }
    .loginBar:before {
      content: "";
      position: absolute;
      top: 0%;
      right: 0%;
      width: 0px;
      height: 0px;
      border-top: 1px solid transparent;
      border-right: 1px solid transparent;
    }
    .loginBar:after {
      content: "";
      position: absolute;
      top: 0%;
      right: 0%;
      width: 0px;
      height: 0px;
      border-bottom: 1px solid transparent; 
      border-left: 1px solid transparent;
    }
  }
</style>
<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary-espol" class="loginBar">
            <v-toolbar-title class="mx-auto">Peer Project Learning</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mt-3">
            <v-form @submit="login">
              <v-text-field prepend-icon="person" name="login" label="Correo" type="text" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Contraseña" id="password" type="password" v-model="password" :rules="[rules.required]"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="mx-auto pb-3" style="justify-content: center;">
            <v-container grid-list-xl fluid>
              <v-layout wrap class="text-xs-center">
                <v-flex xs12 sm6>
                  <v-btn class="primary-espol" :loading="loading" :disabled="disabled" @click.native="login" type="submit">Iniciar sesión</v-btn>
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
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-dialog v-model="dialog.active" width="500">
        <v-card class="text-xs-center">
          <v-card-text class="headline">{{ dialog.text }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="dialog.active = false">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
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
        },
        dialog: {
          active: false,
          text: ''
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
        const url = '/api/login/session'
        this.$http.post(url, { email: this.email, password: this.password })
          .then((resp) => {
            this.loading = false
            this.dialogSuccess()
            localStorage.setItem('x-access-token', resp.body.datos)
            localStorage.setItem('email', this.email)
            this.$router.push('/dashboard')
          })
          .catch((err) => {
            this.loading = false
            this.dialogError(err.body.message)
          })
      },
      registroProfesor () {
        this.$router.push('/registro/profesor')
      },
      registroEstudiante () {
        this.$router.push('/registro/estudiante')
      },
      dialogSuccess () {
        this.dialog.active = true
        this.dialog.text = 'Exito'
      },
      dialogError (text) {
        this.dialog.active = true
        this.dialog.text = text
      }
    }
  }
</script>
