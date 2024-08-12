const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const tokenService = require('./token.service')
const userService = require('./user.service')
const Token = require('../models/token.model')
const {tokenTypes} = require("../config/tokens");


class authService {
    async loginUser (email, password) {
        const user = await userService.getUserByEmail(email)
        if(!user || !(await user.isPasswordMatch(password))){
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
        }
    }

    async logout (refreshTokens){
        const refreshTokensDoc = await Token.findOne({token: refreshTokens, type: tokenTypes.REFRESH, blacklisted: false})
        if(!refreshTokensDoc){
            throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
        }
        await refreshTokensDoc.remove()
    }

    async refreshAuth (refreshToken){
        try{
            const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.RESET_PASSWORD)
            const user = await userService.getUserById(refreshTokenDoc.user)
            if(!user){
                throw new Error()
            }
            await refreshToken.remove()
        }catch (error){
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
        }
    }

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