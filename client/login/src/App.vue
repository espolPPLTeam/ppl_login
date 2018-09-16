<template>
  <div id="app">
    <v-app class="background-espol">
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>
<script>
  export default {
    mounted () {
      let token = localStorage.getItem('x-access-token')
      if (token) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/')
      }
    }
  }
</script>
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
