const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const tokenService = require('./token.service')
const userService = require('./user.service')
const Token = require('../models/token.model')
const {tokenTypes} = require("../config/tokens");


class authService {
    /**
     * Login with username and password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<User>}
     */
    async loginUser (email, password) {
        const user = await userService.getUserByEmail(email)
        if(!user || !(await user.isPasswordMatch(password))){
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
        }
    }

    /**
     * Logout
     * @returns {Promise}
     * @param refreshTokens
     */

    async logout (refreshTokens){
        const refreshTokensDoc = await Token.findOne({token: refreshTokens, type: tokenTypes.REFRESH, blacklisted: false})
        if(!refreshTokensDoc){
            throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
        }
        await refreshTokensDoc.deleteOne()
    }
    /**
     * Refresh auth tokens
     * @param {string} refreshToken
     * @returns {Promise<Object>}
     */
    async refreshAuth (refreshToken){
        try{
            const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.RESET_PASSWORD)
            const user = await userService.getUserById(refreshTokenDoc.user)
            if(!user){
                throw new Error()
            }
            await refreshTokenDoc.deleteOne()
            return tokenService.generateAuthTokens(user)
        }catch (error){
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
        }
    }
    /**
     * Reset password
     * @param {string} resetPasswordToken
     * @param {string} newPassword
     * @returns {Promise}
     */

    async resetPassword (resetPasswordToken, newPassword){
        try{
            const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD)
            const user = await userService.getUserById(resetPasswordTokenDoc.user)
            if(!user){
                throw new Error()
            }
            await userService.updateUserById()
            await Token.deleteMany({user: user.id, type: token.Types.RESET_PASSWORD})
        }catch (error){
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed')

        }
    }
}

module.exports = authService