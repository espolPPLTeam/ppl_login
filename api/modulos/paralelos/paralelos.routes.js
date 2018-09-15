const responses = require('../../config/responses')
const ParalelosController = require('./paralelos.controller')

module.exports = function (app, opts, next) {
  app.get('/paralelos', async (req, res) => {
  	let resp = await ParalelosController.mostrarTodos()
  	return responses.OK(resp)
  })

  next()
}
