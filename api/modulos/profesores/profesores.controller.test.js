const expect = require('chai').expect

const db = require('../../config/db')
const dump = require('../../config/db/dump/profesores')
const ProfesoresController = require('./profesores.controller')
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

describe('Profesores Controller', () => {
	describe('Registrar', () => {
		let profesorDump
		
		beforeEach(() => {
			profesorDump = dump.profesor()
		})		

		it('CP1. Caso exitoso', (done) => {
			ProfesoresController.registrar(profesorDump)
				.then((resp) => {
					expect(resp.datos).to.be.an('object')
          expect(resp.datos.nombres).to.equal(profesorDump.nombres)
					done()
				})
		})
		it('CP2. Datos no recibidos', (done) => {
			ProfesoresController.registrar()
				.catch((err) => {
					expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Type error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('Debe enviar el profesor.')
					done()
				})
		})
		it('CP3. Email ya existente', (done) => {
			ProfesoresController.registrar(profesorDump)
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
			profesorDump.email = 'hola@gmail.com'
			profesorDump.clave = null
			ProfesoresController.registrar(profesorDump)
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
			profesorDump.email = 'hola@gmail.com'
			profesorDump.nombres = null
			ProfesoresController.registrar(profesorDump)
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