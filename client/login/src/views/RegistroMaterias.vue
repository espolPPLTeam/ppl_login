<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-toolbar dark color="primary-espol" style="border-bottom: 2px solid #F5b400">
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
<style scoped></style>
