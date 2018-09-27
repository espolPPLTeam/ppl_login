// const Usuario = require('../models/usuario')

const bcrypt = require('bcrypt')
const jwt    = require('jsonwebtoken')

module.exports.authenticate = async (user, clave, tipo) => {
  if( !bcrypt.compareSync(clave, user.clave) ) {
    return Promise.reject({ message: 'Contraseñas no coinciden' })
  }
  const payload = {
    _id: user._id,
    email: user.email,
    tipo
  }
  const secret = process.env.SECRET
  const token  = jwt.sign(payload, secret) // Luego hay que ver cómo le añadimos una fecha de expiración y cómo lo manejamos en el front
  return Promise.resolve(token)
}

module.exports.generateHash = (password) => {
  return new Promise( (resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if ( err ) return reject(err)
      bcrypt.hash(password, salt, (err2, hash) => {
        if ( err2 )return reject(err2)
        return resolve(hash)
      })
    })
  })
}

module.exports.verifyToken = (req) => {
  return new Promise((resolve, reject) => {
    const token = req.headers['x-access-token']
    if( !token ){
      return reject('Token no enviado')
    }
    const secret = process.env.SECRET
    jwt.verify(token, secret, (err, decoded) => {
      if ( err ) {
        if ( err.message === 'jwt expired') return reject('Token expiró')
        return reject('Token inválido')
      }
      return resolve(decoded)
    })
  })
}

