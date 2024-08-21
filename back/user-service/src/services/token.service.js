const jwt = require("jsonwebtoken")
const moment = require('moment')
const httpStatus = require('http-status')
const config = require('../config/config')
const userService = require('./user.service')
const {Token} =  require('../models')
const ApiError = require('../utils/ApiError')
const {tokensTypes} = require('../config/tokens')


class tokenService {
    /**
     * Generate token
     * @param {module:mongoose.Types.ObjectId} userId
     * @param {moment.Moment} expires
     * @param {string} [secret]
     * @returns {string}
     */
    async generateToken(userId, expires, type, secret = config.jwt.secret){
        const payload = {
            sub: userId,
            iat: moment().unix(),
            exp: expires.unix(),
            type,
        }
        return jwt.sign(payload, secret)
    }

    /**
     * Save a token
     * @param {string} token
     * @param {ObjectId} userId
     * @param {Moment} expires
     * @param {string} type
     * @param {boolean} [blacklisted]
     * @returns {Promise<Token>}
     */
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

    /**
     * Verify token and return token doc (or throw an error if it is not valid)
     * @param {string} token
     * @param {string} type
     * @returns {Promise<Token>}
     */

    async verifyToken(token, type){
        const payload = jwt.verify(token, config.jwt.secret)
        const tokenDoc = await Token.findOne({token, type, user: payload.sub, blacklisted: false})
        if(!tokenDoc){
            throw new Error('Token not found')
        }
        return tokenDoc

    }

    /**
     * Generate auth tokens
     * @param {User} user
     * @returns {Promise<Object>}
     */
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
    /**
     * Generate reset password token
     * @param {string} email
     * @returns {Promise<string>}
     */
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

module.exports = new tokenService()