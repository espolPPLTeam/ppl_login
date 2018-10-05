module.exports = {
  logger () {
    if (process.env.NODE_ENV === 'testing') {
      return {}
    } else {
      return { logger: true }
    }
  },
  URL_DB () {
    if (process.env.NODE_ENV === 'testing') {
      return 'mongodb://localhost/ppl_testing_v2'
    } else if (process.env.NODE_ENV === 'development') {
      return 'mongodb://localhost/ppl_development_v2'
    } else if (process.env.NODE_ENV === 'production') { 
      return 'mongodb://localhost/ppl_production_v2'
    } else {
      console.error('No se ha especificado una variable de entorno')
      process.exit(1)
    }
  },
  PORT: 8001
}