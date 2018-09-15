<template>
  <main>
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
    <v-snackbar v-model="snackbar" bottom :color="'success'">
      Registrado en la materia.
      <v-btn flat @click="snackbar = false">X</v-btn>
    </v-snackbar>
  </main>
</template>
<script>
  export default {
    mounted () {
      this.email = this.$route.params.email_estudiante
      Promise.all([
        this.getMaterias(),
        this.getParalelos()
      ]).then((values) => {
        console.log(values)
        this.materias = values[0]
        this.paralelos = values[1]
      })
    },
    data () {
      return {
        email: '',
        materias: [
          {
            nombre: 'Física 2',
            _id: 'f2'
          },
          {
            nombre: 'Física 3',
            _id: 'f3'
          },
          {
            nombre: 'Química PRE',
            _id: 'qpre'
          },
          {
            nombre: 'Física PRE',
            _id: 'fpre'
          }
        ],
        paralelos: [
          {
            nombre: 'P1',
            materia: 'f2',
            _id: 'f2p1'
          },
          {
            nombre: 'P2',
            materia: 'f2',
            _id: 'f2p2'
          },
          {
            nombre: 'P3',
            materia: 'f2',
            _id: 'f2p3'
          },
          {
            nombre: 'P1',
            materia: 'f3',
            _id: 'f3p1'
          },
          {
            nombre: 'P1',
            materia: 'qpre',
            _id: 'qppre1'
          },
          {
            nombre: 'P1',
            materia: 'fpre',
            _id: 'fpre1'
          },
          {
            nombre: 'P2',
            materia: 'fpre',
            _id: 'fpre2'
          }
        ],
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
        /*return new Promise((resolve, reject) => {
          return 
        })*/
        return this.$http.get('/api/login/materias').then((resp) => Promise.resolve(resp.body.datos))
      },
      getParalelos () {
        return this.$http.get('/api/login/paralelos').then((resp) => Promise.resolve(resp.body.datos))
      }
    }
  }
</script>
<style scoped></style>
