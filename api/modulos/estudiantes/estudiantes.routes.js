const EstudiantesController = require('./estudiantes.controller')

module.exports = function (app, opts, next) {
  
  app.post('/estudiantes', async (req, res) => {
    let resp = await EstudiantesController.registrar(req.body)
    return resp
  })

  next()
}
