const mongoose = require('mongoose')
const shortid = require('shortid')

mongoose.Promise = global.Promise

const validators = require('../../config/validators')
const errors = require('../../config/errors')

const EstudiantesSchema = mongoose.Schema({
	_id: {
		type: String,
		'default': shortid.generate
	},
	nombres: {
		type: String,
		required: [true, 'El campo "Nombres" es obligatorio'],
		validate: [
      { validator: validators.noSpecialChars, msg: 'El campo "Nombres" no acepta caracteres especiales' },
      { validator: validators.notEmpty, msg: 'El campo "Nombres" no puede estar vacío' }
    ]
	},
	apellidos: {
		type: String,
		required: [true, 'El campo "Apellidos" es obligatorio'],
		validate: [
      { validator: validators.noSpecialChars, msg: 'El campo "Apellidos" no acepta caracteres especiales' },
      { validator: validators.notEmpty, msg: 'El campo "Apellidos" no puede estar vacío' }
    ]
	},
	carrera: {
		type: String,
		validate: [
			{ validator: validators.noSpecialChars, msg: 'El campo "Carrera" no acepta caracteres especiales' },
      { validator: validators.notEmpty, msg: 'El campo "Carrera" no puede estar vacío' }
		]
	},
	matricula: {
		type: String,
		validate: [
			{ validator: validators.noSpecialChars, msg: 'El campo "Matrícula" no acepta caracteres especiales' },
      { validator: validators.notEmpty, msg: 'El campo "Matrícula" no puede estar vacío' }
		]
	},
	email: {
		type: String,
		required: [true, 'El campo "Email" es obligatorio'],
		unique: true,
		 validate: [
      { validator: validators.notEmpty, msg: 'El campo "Email" no puede estar vacío' },
      { validator: validators.validEmail, msg: 'Email inválido' }
    ]
	},
	clave: {
		type: String,
		required: [true, 'El campo "Clave" es obligatorio']
	},
	lecciones: [],
	paralelos: [],
	grupos: [],
	estado: {
		type: String,
		'default': 'activo',
		enum: {
      values: ['activo', 'inactivo'],
      message: 'El campo "Estado" solo puede ser "activo" o "inactivo"'
    }
	}
}, { timestamps: false, versionKey: false, collection: 'estudiantes' })

EstudiantesSchema.virtual('id').get(function(){
	return this._id
})

EstudiantesSchema.methods = {
  registrar () {
    return this.save().then((doc) => {
	    return Promise.resolve(doc)
	  }).catch((err) => {
	    return Promise.reject(errors.ERROR_HANDLER(err))
	  })
  }
}

EstudiantesSchema.statics = {
	buscarPorEmail (email) {
		return this.findOne({email}).select('-createdAt -updatedAt -clave').exec()
	}
}

module.exports = mongoose.model('Estudiantes', EstudiantesSchema)
