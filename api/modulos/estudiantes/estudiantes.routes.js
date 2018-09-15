const EstudiantesController = require('./estudiantes.controller')

module.exports = function (app, opts, next) {
  
  app.post('/estudiantes', async (req, res) => {
    let resp = await EstudiantesController.registrar(req.body)
    return resp
  })

  app.put('/estudiantes/:email_estudiante/registrarParalelo', async (req, res) => {
  	let resp = await EstudiantesController.registrarParalelo(req.params.email_estudiante, req.body.paralelo)
  	return resp
  })

  next()
}
