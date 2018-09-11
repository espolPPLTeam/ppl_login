<template>
  <main>
    <v-card>
      <v-toolbar dark color="primary-espol" style="border-bottom: 2px solid #F5b400">
        <v-btn icon route :to="'/'">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>Registro Estudiante</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-container grid-list-xl fluid>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field name="nombres" label="Nombres" type="text" v-model="nombres" :rules="[rules.required, rules.maximo]"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field name="apellidos" label="Apellidos" type="text" v-model="apellidos" :rules="[rules.required, rules.maximo]"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field name="matricula" label="Matrícula/Identificación" type="text" v-model="matricula" :rules="[rules.required, rules.maximo]"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field name="carrera" label="Carrera" type="text" v-model="carrera" :rules="[rules.maximo]"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field name="email" label="Correo" type="text" v-model="email" :rules="[rules.required, rules.email]"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field name="password" label="Contraseña" type="password" v-model="password" :rules="[rules.required, rules.maximo]"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field name="repeatPassword" label="Repetir contraseña" type="password" v-model="repeatPassword" :rules="[rules.required, rules.repeatPassword, rules.maximo]"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="mx-auto pb-3" style="justify-content: center;">
        <v-btn class="primary-espol" :loading="loading" :disabled="disabled" @click.native="registrar">Registrar</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog.active" width="500">
      <v-card class="text-xs-center">
        <v-card-text class="headline">Usuario registrado</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat router :to="'/'">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </main>  
</template>
<script>
  export default {
    data () {
      return {
        nombres: '',
        apellidos: '',
        matricula: '',
        carrera: '',
        email: '',
        password: '',
        repeatPassword: '',
        rules: {
          required: (value) => !!value || 'Este campo es obligatorio.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email inválido.'
          },
          repeatPassword: (value) => {
            return value === this.password || 'Contraseñas no coinciden.'
          },
          maximo: (value) => {
            return value.length <= 50 || 'Máximo 50 caracteres.'
          }
        },
        loading: false,
        dialog: {
          active: false,
          text: '',
        }
      }
    },
    computed: {
      disabled () {
        return this.isEmpty(this.nombres) || this.isEmpty(this.apellidos) || this.isEmpty(this.matricula) || this.isEmpty(this.email) || this.isEmpty(this.password) || this.isEmpty(this.repeatPassword) || this.loading || this.password !== this.repeatPassword
      }
    },
    methods: {
      isEmpty (field) {
        return field === '' || field === undefined || !field
      },
      registrar () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.dialogSuccess()
        }, 3000)
      },
      dialogSuccess () {
        this.dialog.active = true
        this.dialog.text = 'Usuario registrado'
      },
      dialogError () {
        this.dialog.active = true
        this.dialog.text = 'Error al registrar usuario'
      }
    }
  }
</script>
<style scoped></style>
