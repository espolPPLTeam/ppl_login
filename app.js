const { logger } = require('./api/config')

const Fastify = require('fastify')

const fastify = Fastify(logger())

if (process.env.NODE_ENV === 'demo') {
  // API for demo
  const prefixDemo = { prefix: '/api/v0/login' }

  const estudiantesDemo = require('./api/demo/modulos/estudiantes/estudiantes.routes')
  fastify.register(estudiantesDemo, prefixDemo)
  const paralelosDemo = require('./api/demo/modulos/paralelos/paralelos.routes')
  fastify.register(paralelosDemo, prefixDemo)
  const loginDemo = require('./api/demo/modulos/login/login.routes')
  fastify.register(loginDemo, prefixDemo)
} else {
  const prefix = { prefix: '/api/login' }
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
}

module.exports = fastify
