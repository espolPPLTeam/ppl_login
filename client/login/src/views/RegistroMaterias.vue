<style>
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
        <v-card>
          <v-toolbar dark color="primary-espol" class="loginBar">
            <v-btn icon route :to="'/'">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Registro Materias</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-container grid-list-xl fluid>
                <registro-materia :email="email" :materias="materias" :paralelos="paralelos" v-on:registrar="estudianteRegistrado"></registro-materia>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="mx-auto" style="justify-content: center;">
            <v-btn class="primary-espol" :disabled="!registrado" route :to="'/'">Terminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-snackbar v-model="snackbar" bottom :color="'success'">
      Registrado en la materia.
        <v-btn flat @click="snackbar = false">X</v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    mounted () {
      this.email = this.$route.params.email_estudiante
      Promise.all([
        this.getMaterias(),
        this.getParalelos()
      ]).then((values) => {
        this.materias = values[0]
        this.paralelos = values[1]
      })
    },
    data () {
      return {
        email: '',
        materias: [],
        paralelos: [],
        registros: [],
        registrado: false,
        snackbar: false
      }
    },
    methods: {
      estudianteRegistrado () {
        this.registrado = true
        this.snackbar = true
      },
      getMaterias () {
        return this.$http.get('/api/login/materias').then((resp) => Promise.resolve(resp.body.datos))
      },
      getParalelos () {
        return this.$http.get('/api/login/paralelos').then((resp) => Promise.resolve(resp.body.datos))
      }
    }
  }
</script>
