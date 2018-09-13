const expect = require('chai').expect

const { URL_DB } = require('../../config')
const db = require('../../config/db')
const Profesores = require('./profesores.model')
const dump = require('../../config/db/dump/profesores')

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

describe('Profesores', () => {
  describe('Registrar', () => {
    let profesorDump = dump.profesor()
    
    xit('CP1. Caso exitoso', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.registrar()
      .then((doc) => {
        expect(doc).to.be.an('object')
        done()
      })
      .catch((err) => {
        done(err)
      })
    })
    it('CP2.Nombre no enviado', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.nombres = null
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Nombres" es obligatorio.')
          done()
        })
    })
    it('CP3.Nombres vacío', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.nombres = ' '
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Nombres" no puede estar vacío.')
          done()
        })
    })
    it('CP4. Nombres con caracteres especiales', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.nombres = 'Joel Rod<>iguez'
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Nombres" no acepta caracteres especiales.')
          done()
        })
    })
    it('CP5. Apellidos no enviado', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.apellidos = null
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Apellidos" es obligatorio.')
          done()
        })
    })
    it('CP6.Apellidos vacío', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.apellidos = ' '
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Apellidos" no puede estar vacío.')
          done()
        })
    })
    it('CP7. Apellidos con caracteres especiales', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.apellidos = 'Rod<>iguez'
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Apellidos" no acepta caracteres especiales.')
          done()
        })
    })
    it('CP8. Email no enviado', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.email = null
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Email" es obligatorio.')
          done()
        })
    })
    it('CP9. Email vacío', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.email = ' '
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Email" no puede estar vacío.')
          done()
        })
    })
    it('CP10. Email inválido', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.email = 'hola'
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('Email inválido.')
          done()
        })
    })
    it('CP11. Clave no enviada', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.clave = null
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Clave" es obligatorio.')
          done()
        })
    })
    it('CP12. Estado no válido', (done) => {
      const profesor = new Profesores(profesorDump)
      profesor.estado = 'adsfasdf'
      profesor.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Estado" solo puede ser "activo" o "inactivo".')
          done()
        })
    })
  })
})