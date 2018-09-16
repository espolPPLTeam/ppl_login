const responses = require('../../config/responses')
const auth = require('../authentication/authentication')
const Estudiantes = require('../estudiantes/estudiantes.model')
const Profesores = require('../profesores/profesores.model')

const login = async (email, clave) => {
  if (!email) {
    return Promise.reject({ message: 'No envió email' })
  }

  let estudiante = await Estudiantes.buscarPorEmail(email, '-createdAt -updatedAt')
  let profesor = await Profesores.buscarPorEmail(email, '-createdAt -updatedAt')

  let user = {}
  let tipo = ''
  if (estudiante !== null) {
    user = estudiante
    tipo = 'estudiante'
  } else if (profesor !== null) {
    user = profesor
    tipo = 'profesor'
  } else {
    return Promise.reject({ message: 'No se encontró el correo en la base de datos' })
  }

  const token = await auth.authenticate(user, clave, tipo)
  return Promise.resolve(token)
}

const obtenerUsuarioPorEmail = async (email) => {
  let estudiante = await Estudiantes.buscarPorEmailPopulate(email, '-createdAt -updatedAt -clave')
  let profesor = await Profesores.buscarPorEmailPopulate(email, '-createdAt -updatedAt -clave')
  let usuario = null

  if (estudiante !== null) {
    let paralelos = estudiante.paralelos.map((paralelo) => {
      return {
        _id: paralelo._id,
        nombreParalelo: paralelo.nombre,
        materia: paralelo.materia,
        nombreMateria: paralelo.nombreMateria,
      }
    })
    usuario = {
      ...estudiante._doc,
      paralelos,
      tipo: 'estudiante'
    }
  } else if (profesor !== null) {
    let paralelos = profesor.paralelos.map((paralelo) => {
      return {
        _id: paralelo._id,
        nombreParalelo: paralelo.nombre,
        materia: paralelo.materia,
        nombreMateria: paralelo.nombreMateria,
      }
    })
    usuario = {
      ...profesor._doc,
      paralelos,
      tipo: 'profesor'
    }
  } else {
    return Promise.reject({ message: 'No se encontró el correo en la base de datos' })
  }

  return Promise.resolve(usuario)
}

module.exports = {
  login,
  obtenerUsuarioPorEmail
}