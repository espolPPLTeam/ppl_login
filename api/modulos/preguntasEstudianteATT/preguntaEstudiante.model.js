const mongoose = require('mongoose')
const shortid = require('shortid')

mongoose.Promise = global.Promise

const errors = require('../../config/errors')

const PreguntaEstudianteSchema = mongoose.Schema({
  _id: {
    type: String,
	  'default': shortid.generate
  },
  creador: {
    matricula: { type: String },
    email: { type: String },
    nombres: { type: String },
    apellidos: { type: String }
  },
  texto: { type: String },
  paralelo: {
    type: String,
    ref: 'Paralelo'
  },
  destacada: {
    type: Boolean,
    'default': false
  },
  calificacion: {
    type: Number,
    'default': 0
  }
},{timestamps: true, versionKey: false, collection: 'preguntasEstudianteATT'})

PreguntaEstudianteSchema.methods = {
  registrar () {
    return this.save().then((doc) => {
        return Promise.resolve(doc)
      }).catch((err) => {
        return Promise.reject(errors.ERROR_HANDLER(err))
      })
  }
}

PreguntaEstudianteSchema.statics = {
  mostrarTodas () {
    return this.find().exec()
  }
}


module.exports = mongoose.model('PreguntaEstudiante', PreguntaEstudianteSchema)
