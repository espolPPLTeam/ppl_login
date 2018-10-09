const mongoose = require('mongoose')
const shortid = require('shortid')

mongoose.Promise = global.Promise

const PreguntaProfesorSchema = mongoose.Schema({ // con la diferencia de createdAt y updateAt podemos sacar el timepo que se habilito la pregunta
  _id: {
    type: String,
	  'default': shortid.generate
  },
  texto: { type: String },
  habilitada: {
    type: Boolean,
    'default': true
  },
  creador: {
    email: { type: String },
    nombres: { type: String },
    apellidos: { type: String },
    tipo: {
      type: String,
      enum: ['titular', 'peer']
    }
  },
  terminadoPor: {
    email: { type: String },
    nombres: { type: String },
    apellidos: { type: String },
    tipo: {
      type: String,
      enum: ['titular', 'peer', 'admin']
    }
  },
  paraleloId: {
    type: String,
    ref: 'Paralelo'
  },
  numeroEstudiantesPresentes: { type: Number },
  respuestas: [{
  	type: String,
	  ref: 'Respuesta',
  }]
},{timestamps: true, versionKey: false, collection: 'preguntasProfesoresATT', toJSON: { virtuals: true }})

module.exports = mongoose.model('PreguntaProfesorATT', PreguntaProfesorSchema)
