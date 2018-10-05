module.exports = {
  logger () {
    if (process.env.NODE_ENV === 'testing') {
      return {}
    } else {
      return { logger: true }
    }
  },
  URL_DB () {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'testing') {
      return 'mongodb://localhost/ppl_testing_v2'
    } else if (process.env.NODE_ENV === 'development') {
      return 'mongodb://localhost/ppl_development_v2'
    } else if (process.env.NODE_ENV === 'production') {
      return 'mongodb://localhost/ppl_production_v2'
    } else if (process.env.NODE_ENV === 'demo') {
      return 'mongodb://localhost/ppl_demo'
    } else {
      console.error('NODE_ENV missing')
      process.exit(1)
    }
  },
  PORT: process.env.PORT || 8001
}
