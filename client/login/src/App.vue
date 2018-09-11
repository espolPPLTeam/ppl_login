<template>
  <div id="app">
    <v-app class="background-espol">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <router-view/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<style>
  .primary-espol {
    background-color: #001C43 !important;
    color: white !important;
  }
  .secondary-espol {
    background-color: #F5b400 !important;
  }
  .background-espol {
    background-color: #eee !important;
  }
</style>
