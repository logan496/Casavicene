const Joi = require('joi')
const {password} = require('./mongoId.validation')


const register = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password)
    })
}

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        // name: Joi.string().required(),
        password: Joi.string().required()
    })
}

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required()
    })
}

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required()
    })
}

const forgotPassword = {
    body: Joi.object().keys({
        // name: Joi.string().required()
        email: Joi.string().email().required()
    })
}

const resetPassword = {
    query: Joi.object().keys({
        token: Joi.string().required()
    }),
    body: Joi.object().keys({
        password: Joi.string().required().custom(password)
    })
}

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword
}