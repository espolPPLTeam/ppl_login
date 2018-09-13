const expect = require('chai').expect

const { URL_DB } = require('../../config')
const db = require('../../config/db')
const Estudiantes = require('./Estudiantes.model')
const dump = require('../../config/db/dump/estudiantes')

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

describe('Estudiantes', () => {
  describe('Registrar', () => {
    let estudianteDump = dump.estudiante()
    
    xit('CP1. Caso exitoso', (done) => {
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.registrar()
      .then((doc) => {
        expect(doc).to.be.an('object')
        done()
      })
      .catch((err) => {
        done(err)
      })
    })
    it('CP2.Nombre no enviado', (done) => {
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.nombres = null
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.nombres = ' '
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.nombres = 'Joel Rod<>iguez'
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.apellidos = null
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.apellidos = ' '
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.apellidos = 'Rod<>iguez'
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.email = null
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.email = ' '
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.email = 'hola'
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.clave = null
      estudiante.registrar()
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
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.estado = 'adsfasdf'
      estudiante.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Estado" solo puede ser "activo" o "inactivo".')
          done()
        })
    })
    it('CP13. Carrera vacía', (done) => {
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.carrera = ' '
      estudiante.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Carrera" no puede estar vacío.')
          done()
        })
    })
    it('CP14. Carrera con caracteres especiales', (done) => {
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.carrera = 'Ing. Ci<>encias'
      estudiante.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Carrera" no acepta caracteres especiales.')
          done()
        })
    })
    it('CP15. Matrícula vacía', (done) => {
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.matricula = ' '
      estudiante.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Matrícula" no puede estar vacío.')
          done()
        })
    })
    it('CP16. Matrícula con caracteres especiales', (done) => {
      const estudiante = new Estudiantes(estudianteDump)
      estudiante.matricula = '20<>'
      estudiante.registrar()
        .catch((err) => {
          expect(err).to.be.an('object')
          expect(err).to.have.property('type')
          expect(err.type).to.equal('Validation error')
          expect(err).to.have.property('message')
          expect(err.message).to.equal('El campo "Matrícula" no acepta caracteres especiales.')
          done()
        })
    })
  })
})