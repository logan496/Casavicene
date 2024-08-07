const jwt = require("jsonwebtoken")
const moment = require('moment')
const httpStatus = require('http-status')
const config = require('../config/config')
const userService = require('./user.service')
const {Token} =  require('../models')
const ApiError = require('../utils/ApiError')
const {tokensTypes} = require('../config/tokens')


const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    }
    return jwt.sign(payload, secret)
}


const saveToken = async (token, userId , expires, type, blacklisted = false) =>{
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    })
    return tokenDoc
}

const verifyToken = async(token, type) =>{
    const payload = jwt.verify(token, config.jwt.secret)
    const tokenDoc = await Token.findOne({token, type, user: payload.sub, blacklisted: false})
    if(!tokenDoc){
        throw new Error('Token not found')
    }
    return tokenDoc
}

const generateAuthTokens = async (user) => {
    const accessTokenExpises = moment().add(config.jwt.accessExpirationMinutes, 'minutes')
    const accessToken = generateToken(user.id, accessTokenExpises, tokensTypes.ACCESS)

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days')
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokensTypes.REFRESH)
    await saveToken(refreshToken, user.id, refreshTokenExpires, tokensTypes.REFRESH)

    return{
        access: {
            token: accessToken,
            expires: accessTokenExpises.toDate()
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    }
}

const generateResetPasswordToken = async (name) => {
    const user = await userService.getUserByName(name)
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this name')
    }
    const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
    const resertPasswordToken = generateToken(user.id, expires, tokensTypes.RESET_PASSWORD)
    await saveToken(resertPasswordToken, user.id, expires, tokensTypes.RESET_PASSWORD)
    return resertPasswordToken
}

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken
}