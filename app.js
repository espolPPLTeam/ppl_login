const prefix = { prefix: '/api/login' }
const { logger } = require('./api/config')

const Fastify = require('fastify')

const fastify = Fastify(logger())

// rutas api
const profesores = require('./api/modulos/profesores/profesores.routes')
fastify.register(profesores, prefix)

module.exports = fastify