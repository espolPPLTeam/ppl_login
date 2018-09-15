const responses = require('../../config/responses')
const MateriasController = require('./materias.controller')

module.exports = function (app, opts, next) {
  app.get('/materias', async (req, res) => {
  	let resp = await MateriasController.mostrarTodas()
  	return responses.OK(resp)
  })

  next()
}
