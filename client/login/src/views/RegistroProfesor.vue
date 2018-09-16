<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-toolbar dark color="primary-espol" style="border-bottom: 2px solid #F5b400">
            <v-btn icon route :to="'/'">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Registro Profesor</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-container grid-list-xl fluid>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field name="nombres" label="Nombres" type="text" v-model="profesor.nombres" :rules="[rules.required, rules.maximo]"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field name="apellidos" label="Apellidos" type="text" v-model="profesor.apellidos" :rules="[rules.required, rules.maximo]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field name="email" label="Correo" type="text" v-model="profesor.email" :rules="[rules.required, rules.email]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field name="clave" label="Contraseña" type="password" v-model="profesor.clave" :rules="[rules.required, rules.maximo]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field name="repeatClave" label="Repetir contraseña" type="password" v-model="repeatClave" :rules="[rules.required, rules.repeatClave, rules.maximo]"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="mx-auto pb-3" style="justify-content: center;">
            <v-btn class="primary-espol" :loading="loading" :disabled="disabled" @click.native="registrar">Registrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-dialog v-model="dialog.active" width="500">
        <v-card class="text-xs-center">
          <v-card-text class="headline">{{ dialog.text }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat router :to="'/'">
              Regresar
            </v-btn>
            <v-btn v-if="dialog.status === 'error'" flat @click="dialog.active = false">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        profesor: {
          nombres: '',
          apellidos: '',
          email: '',
          clave: '',
        },        
        repeatClave: '',
        rules: {
          required: (value) => !!value || 'Este campo es obligatorio.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Email inválido.'
          },
          repeatClave: (value) => {
            return value === this.profesor.clave || 'Contraseñas no coinciden.'
          },
          maximo: (value) => {
            return value.length <= 50 || 'Máximo 50 caracteres.'
          }
        },
        loading: false,
        dialog: {
          active: false,
          text: '',
          status: ''
        }        
      }
    },
    computed: {
      disabled () {
        return this.isEmpty(this.profesor.nombres) || this.isEmpty(this.profesor.apellidos) || this.isEmpty(this.profesor.email) || this.isEmpty(this.profesor.clave) || this.isEmpty(this.repeatClave) || this.loading || this.profesor.clave !== this.repeatClave
      }
    },
    methods: {
      isEmpty (field) {
        return field === '' || field === undefined || !field
      },
      registrar () {
        this.loading = true
        const url = '/api/login/profesores'
        this.$http.post(url, this.profesor)
          .then(() => {
            this.dialogSuccess()
            this.loading = false
          })
          .catch((err) => {
            this.dialogError(err.body.message)
            this.loading = false
          })
      },
      dialogSuccess () {
        this.dialog.active = true
        this.dialog.text = 'Usuario registrado'
        this.dialog.status = 'success'
      },
      dialogError (text) {
        this.dialog.active = true
        this.dialog.text = text
        this.dialog.status = 'error'
      }
    }
  }
</script>
<style scoped></style>
