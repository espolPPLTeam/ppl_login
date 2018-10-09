const responses = require('../../config/responses')
const auth = require('../authentication/authentication')
const Estudiantes = require('../estudiantes/estudiantes.model')
const Profesores = require('../profesores/profesores.model')
const PreguntaProfesorATT = require('../preguntaProfesorATT/preguntaProfesorATT.model')
const PreguntaEstudiante = require('../preguntasEstudianteATT/preguntaEstudiante.model')
const RespuestasEstudianteATT = require('../respuestasEstudianteATT/respuestasEstudianteATT.model')

const moment = require('moment')

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

const obtenerUsuarioATT = async (decoded) => {
  let data = null
  try {
    if (decoded.tipo === 'estudiante') {
      data = await obtenerDatosEstudiante(decoded.email)
    } else if (token.tipo === 'profesor') {

    } /* else {

    } */
    return data
  } catch (error) {
    console.log('\n\n')
    console.log(error)
    console.log('\n\n')
  }

}

const obtenerDatosEstudiante = async (email) => {
  let start = moment().startOf('day')
  let end = moment().endOf('day')
  let data = null
  try {
    const criteria = {
      email: email
    }
    const projection = {
      clave: 0,
      updatedAt: 0,
      lecciones: 0,
      grupos: 0,
      carrera: 0,
      respuestas: 0,
      estado: 0
    }
    const options = {
      lean: true
    }
    let populate = [
      {
        path: 'preguntas',
        model: PreguntaEstudiante,
        select: '_id texto paralelo createdAt',
        match: {
          createdAt: { $gte: start, $lte: end }
        },
        options: {
          lean: true
        }
      },
      {
        path: 'paralelos',
        select: '_id nombre materia nombreMateria preguntaActual',
        options: { lean: true },
        populate: {
          path: 'preguntaActual',
          model: PreguntaProfesorATT,
          select: '-updatedAt -creador -habilitada',
          populate: {
            path: 'respuestas',
            model: RespuestasEstudianteATT,
            select: '_id creador preguntaId paraleloId texto createdAt',
            match: {
              "creador.email": email
            }
          }
        }
      }
    ]
    data = await Estudiantes.buscarPorEmailPopulate(criteria, projection, options, populate)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  login,
  obtenerUsuarioPorEmail,
  obtenerUsuarioATT
}
