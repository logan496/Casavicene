const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const tokenService = require('../services/token.service')
const userService = require('../services/user.service')
const authService = require('../services/auth.service')
const emailService = require('../services/email.service')


const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body)
    const tokens = await tokenService.generateAuthTokens(user)
    res.status(httpStatus.CREATED).send({user, tokens})
})

const login = catchAsync(async (req, res) => {
    const {name, password} = req.body
    const user = await authService.loginUser(name, password)
    const tokens = await tokenService.generateAuthTokens(user)
    res.send({user, tokens})
})

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshTokens)
    res.status(httpStatus.NO_CONTENT).send()
})

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshTokens)
    res.send({...tokens})
})

const forgotPassword = catchAsync(async (req, res) => {
    // const resetpasswordToken = await tokenService.generateResetPasswordToken(req.body.email)
    await emailService.sendResetPasswordEmail(req.body.email, req.body.password)
    res.status(httpStatus.NO_CONTENT).send()
})

const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password)
    res.status(httpStatus.NO_CONTENT).send()
})


module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    refreshTokens,
    resetPassword,
}