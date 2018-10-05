const mongoose = require('mongoose')
mongoose.Promise = Promise

let conn
let db

let Conectar = function (url) {
  return new Promise(function(resolve) {
    let options = { useNewUrlParser: true }
    if (process.env.NODE_ENV === 'production')
      options = { autoIndex: false }
    conn = mongoose.connect(url, options)
    db = mongoose.connection
    db.on('error', function(err) {
      console.log(`error ${err}`)
    })

    db.on('connected', function () {
      if (process.env.NODE_ENV !== 'testing' && process.env.NODE_ENV !== 'production')
        console.log(`login_ppl connected with  ${url}`)
    })

    db.on('disconnected', function() {
      if (process.env.NODE_ENV !== 'testing' && process.env.NODE_ENV !== 'production')
        console.log(`Database disconnected`)
    })
    resolve(db)
  })
}

let getDatabaseConnection = function () {
  if (!db) {
    console.error('Database not initialized')
    process.exit(1)
  }
  return db
}

let Desconectar = function () {
   mongoose.connection.close()
}

let Limpiar = function() {
  return new Promise(function(resolve) {
    resolve(mongoose.connection.dropDatabase())
  })
}

module.exports = {
  Conectar,
  Desconectar,
  Limpiar,
  getDatabaseConnection,
}
