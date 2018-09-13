function VALIDATION_ERROR(err) {
  this.type = 'Validation error'
  this.message = parseErrorMsg(err.errors)
  // this.stack = (new Error()).stack
}
VALIDATION_ERROR.prototype = Object.create(Error.prototype)
VALIDATION_ERROR.prototype.constructor = VALIDATION_ERROR

function REFERENCE_ERROR(msg) {
  this.type = 'Reference error'
  this.message = msg
}
REFERENCE_ERROR.prototype = Error.prototype
//REFERENCE_ERROR.prototype = Object.create(Error.prototype)
//REFERENCE_ERROR.prototype.constructor = REFERENCE_ERROR

function parseErrorMsg(errors) {
  let message = ''
  for (attr in errors) {
    message = message.concat(errors[attr]['message']).concat('. ')
  }
  return message.slice(0, -1)
}

module.exports.ERROR_HANDLER = (err) => {
  if (err.name === 'ValidationError') {
    throw new VALIDATION_ERROR(err)
  } else if ( err.name === 'ReferenceError') {
    throw new REFERENCE_ERROR(err.msg)
  }
}
