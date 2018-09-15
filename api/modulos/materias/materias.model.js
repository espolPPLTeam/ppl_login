const mongoose = require('mongoose')
const shortid = require('shortid')

mongoose.Promise = global.Promise

const validators = require('../../config/validators')
const errors = require('../../config/errors')

const MateriasSchema = mongoose.Schema({
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
  codigo: {
    type: String,
    required: [true, 'El campo "Código es obligatorio"'],
    validate: [
      { validator: validators.codigoValido, msg: 'El campo "Código" sólo puede tener letras y números'}
    ]
  }
}, { timestamps: false, versionKey: false, collection: 'materias' })

MateriasSchema.virtual('id').get(function(){
  return this._id
})

MateriasSchema.methods = {
  registrar () {
    return this.save().then((doc) => {
        return Promise.resolve(doc)
      }).catch((err) => {
        return Promise.reject(errors.ERROR_HANDLER(err))
      })
  }
}

MateriasSchema.statics = {
  mostrarTodas () {
    return this.find().exec()
  },
  buscarPorID (id) {
    return this.findOne({ _id: id }).exec()
  },
  buscarPorCodigo (codigo) {
    return this.findOne({ codigo }).exec()
  }
}

module.exports = mongoose.model('Materias', MateriasSchema)