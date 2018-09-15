const Materias = require('./materias.model')

const registrar = async (datos) => {
  if (!datos) return Promise.reject({type: 'Type error',  message: 'Debe enviar la materia.'})
  let yaExiste = await Materias.buscarPorCodigo(datos.codigo) 
  if( yaExiste ) {
   return Promise.reject({type: 'Duplicate error',  message: 'Materia ya existe en la base de datos.'})
  }
  let materia = new Materias(datos)
  let materiaCreada = await materia.registrar()

  return materiaCreada._id
}

const mostrarTodas = async () => {
  return await Materias.mostrarTodas()
}

module.exports = {
  registrar,
  mostrarTodas
}