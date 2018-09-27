const LoginController = require('./login.controller')
const Auth = require('../authentication/authentication')

module.exports = function (app, opts, next) {

  app.post('/session', async (req, res) => {
    let resp = await LoginController.login(req.body.email, req.body.password)
    return { datos: resp }
  })

  app.get('/session/:email', async (req, res) => {
  	let resp = await LoginController.obtenerUsuarioPorEmail(req.params.email)
  	return { datos: resp }
  })

  app.get('/session', async (req, res) => {
    try{
      const decoded = await Auth.verifyToken(req)
      let resp = await LoginController.obtenerUsuarioPorEmail(decoded.email)
      return { datos: resp }
    } catch (err) {
      return { err: err }
    }
  })

  next()
}
