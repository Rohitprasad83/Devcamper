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
    res
        .status(error.statusCode || 500)
        .json({ success: false, error: error.message || 'server error' })
}

module.exports = errorHandler