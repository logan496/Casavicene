const jwt = require("jsonwebtoken")
const moment = require('moment')
const httpStatus = require('http-status')
const config = require('../config/config')
const userService = require('./user.service')
const {Token} =  require('../models')
const ApiError = require('../utils/ApiError')
const {tokensTypes} = require('../config/tokens')


class tokenService {
    // const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    //     const payload = {
    //         sub: userId,
    //         iat: moment().unix(),
    //         exp: expires.unix(),
    //         type,
    //     }
    //     return jwt.sign(payload, secret)
    // }

    async generateToken(userId, expires, type, secret = config.jwt.secret){
        const payload = {
            sub: userId,
            iat: moment().unix(),
            exp: expires.unix(),
            type,
        }
        return jwt.sign(payload, secret)
    }

    // const saveToken = async (token, userId , expires, type, blacklisted = false) =>{
    //     const tokenDoc = await Token.create({
    //         token,
    //         user: userId,
    //         expires: expires.toDate(),
    //         type,
    //         blacklisted,
    //     })
    //     return tokenDoc
    // }

    async saveToken(token, userId, expires, type, blacklisted = false) {
        await Token.create({
            token,
            user: userId,
            expires: expires.toDate(),
            type,
            blacklisted,
        })
            .then(tokenDoc => {
                return tokenDoc
            })
            .catch(error => console.log(error))
    }

    // const verifyToken = async(token, type) =>{
    //     const payload = jwt.verify(token, config.jwt.secret)
    //     const tokenDoc = await Token.findOne({token, type, user: payload.sub, blacklisted: false})
    //     if(!tokenDoc){
    //         throw new Error('Token not found')
    //     }
    //     return tokenDoc
    // }

    async verifyToken(token, type){
        const payload = jwt.verify(token, config.jwt.secret)
        // await Token.findOne({token, type, user: payload.sub, blacklisted: false})
        //     .then(tokenDoc => {
        //         return tokenDoc
        //     })
        //     .catch(() => throw new Error('Token not found'))
        const tokenDoc = await Token.findOne({token, type, user: payload.sub, blacklisted: false})
        if(!tokenDoc){
            throw new Error('Token not found')
        }
        return tokenDoc

    }

    // const generateAuthTokens = async (user) => {
    //     const accessTokenExpises = moment().add(config.jwt.accessExpirationMinutes, 'minutes')
    //     const accessToken = generateToken(user.id, accessTokenExpises, tokensTypes.ACCESS)
    //
    //     const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days')
    //     const refreshToken = generateToken(user.id, refreshTokenExpires, tokensTypes.REFRESH)
    //     await saveToken(refreshToken, user.id, refreshTokenExpires, tokensTypes.REFRESH)
    //
    //     return{
    //         access: {
    //             token: accessToken,
    //             expires: accessTokenExpises.toDate()
    //         },
    //         refresh: {
    //             token: refreshToken,
    //             expires: refreshTokenExpires.toDate()
    //         }
    //     }
    // }
    async generateAuthTokens(user) {
        const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes')
        const accessToken = this.generateToken(user.id, accessTokenExpires, tokensTypes.ACCESS)

        const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days')
        const refreshToken = this.generateToken(user.id, refreshTokenExpires, tokensTypes.REFRESH)
        await this.saveToken(refreshToken, user.id, refreshTokenExpires, tokensTypes.REFRESH)

        return{
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate()
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate()
            }
        }
    }

    // const generateResetPasswordToken = async (name) => {
    //     const user = await userService.getUserByName(name)
    //     if(!user){
    //         throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this name')
    //     }
    //     const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
    //     const resertPasswordToken = generateToken(user.id, expires, tokensTypes.RESET_PASSWORD)
    //     await saveToken(resertPasswordToken, user.id, expires, tokensTypes.RESET_PASSWORD)
    //     return resertPasswordToken
    // }
    //
    async generateResetPasswordToken(email) {
        const user = await userService.getUserByEmail(email)
        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this name')
        }
        const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
        const resertPasswordToken = this.generateToken(user.id, expires, tokensTypes.RESET_PASSWORD)
        await this.saveToken(resertPasswordToken, user.id, expires, tokensTypes.RESET_PASSWORD)
        return resertPasswordToken
    }


}

//
// module.exports = {
//     generateToken,
//     saveToken,
//     verifyToken,
//     generateAuthTokens,
//     generateResetPasswordToken
// }

module.exports = tokenService