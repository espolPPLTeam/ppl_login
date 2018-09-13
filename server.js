const { PORT, URL_DB } = require('./api/config')
const fastify = require('./app')
const db = require('./api/config/db')
const start = async () => {
  try {
    await db.Conectar(URL_DB())
    await fastify.listen(PORT)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()