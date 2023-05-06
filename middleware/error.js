const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
    console.log(err.stack.red)
    console.log(err.name)

    let error = {...err }
    error.message = err.message

    if (err.name === 'CastError') {
        const message = `Bootcamp not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    if (err.code === 11000) {
        const message = `Duplicate field name`
        error = new ErrorResponse(message, 404)
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 404)
    }

    res
        .status(error.statusCode || 500)
        .json({ success: false, error: error.message || 'server error' })
}

module.exports = errorHandler