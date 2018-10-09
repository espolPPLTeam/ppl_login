const mongoose = require('mongoose')
const shortid = require('shortid')

mongoose.Promise = global.Promise

const RespuestaSchema = mongoose.Schema({
  _id: {
    type: String,
	  'default': shortid.generate
  },
  texto: { type: String },
  creador: {
    email: { type: String },
    nombres: { type: String },
    apellidos: { type: String }
  },
  destacada: {
    type: Boolean,
    'default': false
  },
  paraleloId: {
    type: String,
    ref: 'Paralelo'
  },
  preguntaId: {
    type: String,
    ref: 'PreguntaProfesor'
  },
  calificacion: {
    type: Number,
    'default': 0
  }
},{timestamps: true, versionKey: false, collection: 'respuestasATT'})

module.exports = mongoose.model('RespuestasATT', RespuestaSchema)
