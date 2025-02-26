const mongoose = require('mongoose')
const httpStatus = require('http-status')
const config = require('../config/config')
const logger = require('../config/logger')
const ApiError = require('../utils/ApiError')


const errorConverter = (err, req, res, next) => {
    if(!(err instanceof ApiError)){
        const statusCode =
            err.statusCode || err instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
        const message = err.message || httpStatus[statusCode]
        err = new ApiError(statusCode, message, false, err.stack)
    }
}

const errorHandler = (err, req, res, next) => {
    let {statusCode, message} = err
    if(config.env === 'production' && !err.isOperational){
        statusCode =httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    }
    res.locals.errorMessage = err.message

    const response = {
        code: statusCode,
        message,
        ...(config.env === 'development' && {stack: err.stack})
    }

    if(config.env === 'development') {
        logger.error(err)
    }

    res.status(statusCode).send(response)
}

module.exports = {
    errorConverter,
    errorHandler
}