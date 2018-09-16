const URL_DB = 'mongodb://localhost/ppl_development_v2'
const db = require('./')

const Materias = require('../../modulos/materias/materias.model')
const Paralelos = require('../../modulos/paralelos/paralelos.model')
const ingresarMaterias = async () => {
	console.log('Comenzando')
	try {
		const conn = await db.Conectar(URL_DB)
		// FÍSICA 2
		let fisica2 = new Materias({ nombre: 'Física 2', codigo: 'FISG1002', _id: 'FISG1002' })
		await fisica2.registrar()
		let f2p1 = new Paralelos({ nombre: '1', anio: '2018', termino: '1', materia: fisica2._id, nombreMateria: fisica2.nombre })
		await f2p1.registrar()
		let f2p2 = new Paralelos({ nombre: '2', anio: '2018', termino: '1', materia: fisica2._id, nombreMateria: fisica2.nombre })
		await f2p2.registrar()
		let f2p3 = new Paralelos({ nombre: '3', anio: '2018', termino: '1', materia: fisica2._id, nombreMateria: fisica2.nombre })
		await f2p3.registrar()
		let f2p4 = new Paralelos({ nombre: '4', anio: '2018', termino: '1', materia: fisica2._id, nombreMateria: fisica2.nombre })
		await f2p4.registrar()
		let f2p5 = new Paralelos({ nombre: '5', anio: '2018', termino: '1', materia: fisica2._id, nombreMateria: fisica2.nombre })
		await f2p5.registrar()
		// FÍSICA 3
		let fisica3 = new Materias({ nombre: 'Física 3', codigo: 'FISG1003', _id: 'FISG1003' })
		await fisica3.registrar()
		let f3p1 = new Paralelos({ nombre: '1', anio: '2018', termino: '1', materia: fisica3._id, nombreMateria: fisica3.nombre })
		await f3p1.registrar()
		let f3p2 = new Paralelos({ nombre: '2', anio: '2018', termino: '1', materia: fisica3._id, nombreMateria: fisica3.nombre })
		await f3p2.registrar()
		let f3p3 = new Paralelos({ nombre: '3', anio: '2018', termino: '1', materia: fisica3._id, nombreMateria: fisica3.nombre })
		await f3p3.registrar()
		// FÍSICA CONCEPTUAL
		let fisicaConceptual = new Materias({ nombre: 'Física Conceptual', codigo: 'FISG2001', _id: 'FISG2001' })
		await fisicaConceptual.registrar()
		let fcp1 = new Paralelos({ nombre: '1', anio: '2018', termino: '1', materia: fisicaConceptual._id, nombreMateria: fisicaConceptual.nombre })
		await fcp1.registrar()
		let fcp2 = new Paralelos({ nombre: '2', anio: '2018', termino: '1', materia: fisicaConceptual._id, nombreMateria: fisicaConceptual.nombre })
		await fcp2.registrar()
		let fcp3 = new Paralelos({ nombre: '3', anio: '2018', termino: '1', materia: fisicaConceptual._id, nombreMateria: fisicaConceptual.nombre })
		await fcp3.registrar()
		// FÍSICA PRE
		let fisicaPre = new Materias({ nombre: 'Física PRE', codigo: 'FISG0001', _id: 'FISG0001' })
		await fisicaPre.registrar()
		let fpp1 = new Paralelos({ nombre: '1', anio: '2018', termino: '1', materia: fisicaPre._id, nombreMateria: fisicaPre.nombre })
		await fpp1.registrar()
		let fpp2 = new Paralelos({ nombre: '2', anio: '2018', termino: '1', materia: fisicaPre._id, nombreMateria: fisicaPre.nombre })
		await fpp2.registrar()
		let fpp3 = new Paralelos({ nombre: '3', anio: '2018', termino: '1', materia: fisicaPre._id, nombreMateria: fisicaPre.nombre })
		await fpp3.registrar()
		// QUÍMICA PRE
		let quimicaPre = new Materias({ nombre: 'Química PRE', codigo: 'QUIM0001', _id: 'QUIM0001' })
		await quimicaPre.registrar()
		let qpp1 = new Paralelos({ nombre: '1', anio: '2018', termino: '1', materia: quimicaPre._id, nombreMateria: quimicaPre.nombre })
		await qpp1.registrar()
		let qpp2 = new Paralelos({ nombre: '2', anio: '2018', termino: '1', materia: quimicaPre._id, nombreMateria: quimicaPre.nombre })
		await qpp2.registrar()
		let qpp3 = new Paralelos({ nombre: '3', anio: '2018', termino: '1', materia: quimicaPre._id, nombreMateria: quimicaPre.nombre })
		await qpp3.registrar()
		console.log('Terminado')
		process.exit(0)
	} catch (e) {
		console.log(e)
		process.exit(-1)
	}
	
}

ingresarMaterias()