const Paralelos = require('./paralelos.model')

const mostrarTodos = async () => {
  return await Paralelos.mostrarTodos()
}

module.exports = {
  mostrarTodos
}