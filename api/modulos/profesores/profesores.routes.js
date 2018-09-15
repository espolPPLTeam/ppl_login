const SCHEMA = require('./SCHEMA')
const ProfesoresController = require('./profesores.controller')

module.exports = function (app, opts, next) {
  
  app.post('/profesores', async (req, res) => {
    let resp = await ProfesoresController.registrar(req.body)
    return resp
  })

  next()
}
