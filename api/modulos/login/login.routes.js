const LoginController = require('./login.controller')

module.exports = function (app, opts, next) {
  
  app.post('/session', async (req, res) => {
    let resp = await LoginController.login(req.body.email, req.body.password)
    return { datos: resp }
  })

  app.get('/session/:email', async (req, res) => {
  	let resp = await LoginController.obtenerUsuarioPorEmail(req.params.email)
  	return { datos: resp }
  })

  next()
}
