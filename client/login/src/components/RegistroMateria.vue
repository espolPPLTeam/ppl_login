<template>
  <v-layout wrap>
    <v-flex xs5 sm5>
      <v-select :items="materias" label="Materia" item-text="nombre" item-value="_id" v-model="materiaSeleccionada" dense :disabled="checked"></v-select>
    </v-flex>
    <v-flex xs5 sm5>
      <v-select :disabled="materiaSeleccionada === '' || checked" :items="paralelosMostrar" label="Paralelo" item-text="nombre" item-value="_id" v-model="paraleloSeleccionado" dense></v-select>
    </v-flex>
    <v-flex xs2 sm2 class="pt-4">
      <v-tooltip top>
        <span>Registrar</span>
        <v-btn slot="activator" icon @click="registrar" :disabled="checkDisabled">
          <v-icon>check</v-icon>
        </v-btn>
      </v-tooltip>
    </v-flex>
    <v-dialog v-model="error.active" width="500">
      <v-card class="text-xs-center">
        <v-card-text class="headline">{{ error.message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="error.active = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    props: ['email', 'materias', 'paralelos'],
    data () {
      return {
        materiaSeleccionada: '',
        paraleloSeleccionado: '',
        checked: false,
        error: {
          active: false,
          message: ''
        }
      }
    },
    computed: {
      paralelosMostrar () {
        return this.paralelos.filter((paralelo) => {
          return paralelo.materia === this.materiaSeleccionada
        })
      },
      checkDisabled () {
        return this.checked || this.materiaSeleccionada === '' || this.paraleloSeleccionado === ''
      }
    },
    methods: {
      registrar () {
        this.$http.put(`/api/login/estudiantes/${this.email}/registrarParalelo`, { paralelo: this.paraleloSeleccionado })
          .then(() => {
            this.checked = true
            this.$emit('registrar', true)
          }, (err) => {
            this.error.message = err.body.datos.message
          })        
      }
    }
  }
</script>