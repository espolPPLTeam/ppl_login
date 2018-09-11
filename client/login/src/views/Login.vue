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
    <v-card-actions>
      <v-btn class="primary-espol mx-auto" :loading="loading" :disabled="disabled" @click.native="login">Iniciar sesión</v-btn>
    </v-card-actions>
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
      }
    }
  }
</script>
<style scoped></style>
