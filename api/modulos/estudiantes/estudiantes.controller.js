const responses = require('../../config/responses')
const auth = require('../authentication/authentication')
const Estudiantes = require('./estudiantes.model')

const registrar = async (datos) => {
  if (!datos) return Promise.reject({type: 'Type error',  message: 'Debe enviar el estudiante.'})
  let yaExiste = await Estudiantes.buscarPorEmail(datos.email)
  if( yaExiste ) {
   return Promise.reject({type: 'Duplicate error',  message: 'Email ya existe en la base de datos.'})
  }
  if(!datos.clave) return Promise.reject({ type: 'Validation error', message: 'Debe enviar la clave.' })
  datos.clave = await auth.generateHash(datos.clave)
  let estudiante = new Estudiantes(datos)

  let estudianteCreado = await estudiante.registrar()
  return responses.OK(estudianteCreado)
}

module.exports = {
  registrar
}