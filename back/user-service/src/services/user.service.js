const httpStatus = require('http-status')
const {User} = require('../models')
const ApiError = require('../utils/ApiError')


const createUser = async (userBody) =>{
    if(await User.isNameTaken(userBody.name)){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Name already use')
    }
    const user = await User.create(userBody)
    return user
}


const queryUsers = async (filter, options)=>{
    const users = await User.paginate(filter, options)
    return users
}

const getUserById = async (id)=> {
    return User.findById(id)
}

const getUserByName = async (name) => {
    return User.findOne({name})
}

const updateUserById = async (userId, updateBody) =>{
    const user = await getUserById(userId)
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    if(updateBody.email && (await User.isNameTaken(updateBody.name, userId))){
        throw  new ApiError(httpStatus.BAD_REQUEST, 'Name already taken')
    }
    Object.assign(user, updateBody)
    await User.save()
    return user
}

const deleteUserById = async (userId) => {
    const user = await getUserById(userId)
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    await User.remove()
    return user
}

module.exports = {
    createUser,
    queryUsers,
    getUserById,
    getUserByName,
    updateUserById,
    deleteUserById
}