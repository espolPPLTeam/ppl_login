const responses = require('../../config/responses')
const auth = require('../authentication/authentication')
const Profesores = require('./profesores.model')

const registrar = async (datos) => {
  if (!datos) return Promise.reject({type: 'Type error',  message: 'Debe enviar el profesor.'})
  let yaExiste = await Profesores.buscarPorEmail(datos.email)
  if( yaExiste ) {
   return Promise.reject({type: 'Duplicate error',  message: 'Email ya existe en la base de datos.'})
  }
  if(!datos.clave) return Promise.reject({ type: 'Validation error', message: 'Debe enviar la clave.' })
  datos.clave = await auth.generateHash(datos.clave)
  let profesor = new Profesores(datos)

  let profesorCreado = await profesor.registrar()
  return responses.OK(profesorCreado)
}

module.exports = {
  registrar
}