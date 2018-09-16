const mongoose = require('mongoose')
const shortid = require('shortid')

mongoose.Promise = global.Promise

const validators = require('../../config/validators')
const errors = require('../../config/errors')

const ParalelosSchema = mongoose.Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  nombre: {
    type: String,
    required: [true, 'El campo "Nombre" es obligatorio'],
    validate: [
      { validator: validators.noSpecialChars, msg: 'El campo "Nombre" no acepta caracteres especiales' },
      { validator: validators.notEmpty, msg: 'El campo "Nombre" no puede estar vacío' }
    ]
  },
  anio: {
    type: String,
    required: [true, 'El campo "Año" es obligatorio'],
    validate: [
      { validator: validators.notEmpty, msg: 'El campo "Año" no puede estar vacío' },
      {
        validator: (v) => {
          return /^[0-9]*$/gm.test(v) && v.length === 4
        },
        msg: 'Debe ingresar un año válido'
      }
    ]
  },
  termino: {
    type: String,
    required: [true, 'El campo "Término" es obligatorio'],
    validate: [
      { validator: validators.onlyNumbers, msg: 'El campo "Término" sólo acepta números' },
      { validator: validators.notEmpty, msg: 'El campo "Término" no puede estar vacío' }
    ]
  },
  materia: {
    type: String,
    ref: 'Materias',
    required: [true]
  },
  nombreMateria: {
    type: String,
    required: [true, 'El campo "Nombre de materia" es obligatorio'],
  },
  estado: {
    type: String,
    'default': 'activo',
    enum: {
      values: ['activo', 'inactivo'],
      message: 'El campo "Estado" solo puede ser "activo" o "inactivo"'
    }
  },
  profesores: [],
  estudiantes: [
    {
      type: String,
      ref: 'Estudiantes',
      field: 'emai',
    }
  ],
  grupos: []
}, { timestamps: false, versionKey: false, collection: 'paralelos' })

ParalelosSchema.methods = {
  registrar () {
    return this.save().then((doc) => {
        return Promise.resolve(doc)
      }).catch((err) => {
        return Promise.reject(errors.ERROR_HANDLER(err))
      })
  }
}

ParalelosSchema.statics = {
  mostrarTodos () {
    return this.find().exec()
  },
  mostrarPorMateria (materiaId) {
    return this.find({ materia: materiaId }).exec()
  },
  mostrarPorAnioTermino (anio, termino) {
    return this.find({ anio, termino }).exec()
  },
  registrarEstudiante (idParalelo, emailEstudiante) {
    return this.update({ _id: idParalelo }, { $addToSet: { estudiantes: emailEstudiante } })
  }
}

module.exports = mongoose.model('Paralelos', ParalelosSchema)