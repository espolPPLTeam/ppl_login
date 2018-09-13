const expect = require('chai').expect

const db = require('../../config/db')
const dump = require('../../config/db/dump/estudiantes')
const EstudiantesController = require('./estudiantes.controller')
const { URL_DB } = require('../../config')

before((done) => {
  db.Conectar(URL_DB())
  .then((conn) => {
    console.log("Successfully connected to the database")
    done()
  }).catch((err) => {
      console.log('Could not connect to the database. Exiting now...')
      done(err)
  })
})

describe('Estudiantes Controller', () => {
	describe('Registrar', () => {
		let estudianteDump
		
		beforeEach(() => {
			estudianteDump = dump.estudiante()
		})		

		it('CP1. Caso exitoso', (done) => {
			EstudiantesController.registrar(estudianteDump)
				.then((resp) => {
					expect(resp.datos).to.be.an('object')
          expect(resp.datos.nombres).to.equal(estudianteDump.nombres)
					done()
				})
		})
		it('CP2. Datos no recibidos', (done) => {
			EstudiantesController.registrar()
				.catch((err) => {
					expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Type error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('Debe enviar el estudiante.')
					done()
				})
		})
		it('CP3. Email ya existente', (done) => {
			EstudiantesController.registrar(estudianteDump)
				.catch((err) => {
					expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Duplicate error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('Email ya existe en la base de datos.')
					done()
				})
		})		
		it('CP4. Clave no enviada', (done) => {
			estudianteDump.email = 'hola@gmail.com'
			estudianteDump.clave = null
			EstudiantesController.registrar(estudianteDump)
				.catch((err) => {
					expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('Debe enviar la clave.')
					done()
				})
		})		
		it('CP5. Error en dato enviado', (done) => {
			estudianteDump.email = 'hola@gmail.com'
			estudianteDump.nombres = null
			EstudiantesController.registrar(estudianteDump)
				.catch((err) => {
					expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Nombres" es obligatorio.')
					done()
				})
		})
	})
})