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
      <!--<v-btn class="hidden-sm-and-down primary-espol" @click="checked = true" :disabled="checked || materiaSeleccionada === '' || paraleloSeleccionado === ''">Registrar</v-btn>-->
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: ['id', 'materias', 'paralelos'],
    data () {
      return {
        materiaSeleccionada: '',
        paraleloSeleccionado: '',
        checked: false
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
        this.checked = true
        this.$emit('registrar', true)
      }
    }
  }
</script>