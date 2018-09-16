<template>
  <v-container flex fill-height>
    <navbar></navbar>
    <v-layout row wrap align-center justify-center>
      <v-flex xs12 sm6 class="text-xs-center mb-3">
        <v-card raised hover class="card-materia" height="250px" width="300px">
          <v-card-title class="pt-5">
            <h3 class="text-xs-center mx-auto display-1">PPL-ASSESSMENT</h3>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center mb-3">
        <v-card raised hover class="card-materia" height="250px" width="300px" @click.native="att">
          <v-card-title class="pt-5">
            <h3 class="text-xs-center mx-auto display-1">Ask the Teacher</h3>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center mb-3">
        <v-card raised hover class="card-materia" height="250px" width="300px">
          <v-card-title class="pt-5">
            <h3 class="text-xs-center mx-auto display-1">READING-ASSESSMENT</h3>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center mb-3">
        <v-card raised hover class="card-materia" height="250px" width="300px">
          <v-card-title class="pt-5">
            <h3 class="text-xs-center mx-auto display-1">PPL</h3>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    methods: {
      att () {
        console.log('Redireccionando')
        window.location.replace('/att')
      }
    }
  }
</script>
<style scoped>
  .card-materia {
    padding: 25px 15px 10px !important;
    flex: 1 1 auto !important;
    border-radius: 5%;
    display: inline-block;
  }
</style>