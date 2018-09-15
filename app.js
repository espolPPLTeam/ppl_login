const prefix = { prefix: '/api/login' }
const { logger } = require('./api/config')

const Fastify = require('fastify')

const fastify = Fastify(logger())

// rutas api
const login = require('./api/modulos/login/login.routes')
fastify.register(login, prefix)
const profesores = require('./api/modulos/profesores/profesores.routes')
fastify.register(profesores, prefix)
const estudiantes = require('./api/modulos/estudiantes/estudiantes.routes')
fastify.register(estudiantes, prefix)
const materias = require('./api/modulos/materias/materias.routes')
fastify.register(materias, prefix)
const paralelos = require('./api/modulos/paralelos/paralelos.routes')
fastify.register(paralelos, prefix)

module.exports = fastify