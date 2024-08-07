const httpStatus = require('http-status')
const User = require('../models/User.model')
const ApiError = require('../utils/ApiError')
const {refreshTokens} = require("../validation/auth.validation");
const tokenService = require('token.service')
const userService = require('user.service')
const Token = require('../models/token.model')
const {tokenTypes} = require("../config/tokens");
const {generateResetPasswordToken} = require("./token.service");

const loginUser = async (name, password) => {
    const user = await User.findOne({name})
    if(!user || !(await User.isPasswordMatch(password))){
        throw  new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect name or password')
    }
    return user
}

const logout =  async (refreshTokens) => {
    const refreshTokenDoc = await Token.findOne({token: refreshTokens, type: tokenTypes.REFRESH, blacklisted: false})
    if(!refreshTokenDoc){
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    await refreshTokenDoc.remove()
}

const refreshAuth = async (refreshToken) =>{
    try{
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.RESET_PASSWORD)
        const user = await userService.getUserById(refreshTokenDoc.user)
        if(!user){
            throw new Error()
        }
        await refreshTokenDoc.remove()
        return tokenService.generateAuthTokens(user)
    }catch (error){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')

    }
}

const resetPassword = async (resetPasswordToken, newPassword) => {
    try{
        const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD)
        const user = await userService.getUserById(resetPasswordTokenDoc.user)
        if(!user){
            throw new Error()
        }
        await userService.updateUserById(user.id, {password: newPassword})
        await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD})
    }catch (error){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed')
    }
}

module.exports = {
    loginUser,
    logout,
    refreshAuth,
    resetPassword
}