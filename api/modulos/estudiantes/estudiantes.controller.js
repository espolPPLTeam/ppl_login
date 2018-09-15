const responses = require('../../config/responses')
const auth = require('../authentication/authentication')
const Estudiantes = require('./estudiantes.model')
const Paralelos = require('../paralelos/paralelos.model')

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

const registrarParalelo = async (emailEstudiante, idParalelo) => {
  if (!emailEstudiante) return Promise.reject({ type: 'Validation error', message: 'Debe ingresar el email del estudiante' })
  if (!idParalelo) return Promise.reject({ type: 'Validation error', message: 'Debe ingresar el id del paralelo' })
  await Estudiantes.registrarParalelo(emailEstudiante, idParalelo)
  await  Paralelos.registrarEstudiante(idParalelo, emailEstudiante)
  return responses.OK()
}

module.exports = {
  registrar,
  registrarParalelo
}