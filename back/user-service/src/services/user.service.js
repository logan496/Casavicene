const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

class userService {
    /**
     * Create a user
     * @param {Object} userBody
     * @returns {Promise<User>}
     */
    async createUser(userBody) {
        if (await User.isEmailTaken(userBody.email)){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
        }
        const user = User.create(userBody)
        return user
    }

    /**
     * Query for users
     * @param {Object} filter - Mongo filter
     * @param {Object} options - Query options
     * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
     * @param {number} [options.limit] - Maximum number of results per page (default = 10)
     * @param {number} [options.page] - Current page (default = 1)
     * @returns {Promise<QueryResult>}
     */

    async queryUsers(filter, options){
        const users = await User.paginate(filter, options)
        return users
    }

    /**
     * Get user by email
     * @param {string} email
     * @returns {Promise<User>}
     */

    async getUserByEmail(email){
        return  await User.findOne({email})
    }
    /**
     * Get user by id
     * @param {ObjectId} id
     * @returns {Promise<User>}
     */
    async getUserById(id){
        //je dois utiliser une méthode await ici pour l'instant je laisse pour les tests
        return User.findById(id)
    }
    /**
     * Update user by id
     * @param {ObjectId} userId
     * @param {Object} updateBody
     * @returns {Promise<User>}
     */
    async updateUserById(userId, updateBody){
        const user = await this.getUserById(userId)
        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
        }
        if(updateBody.email && (await User.isEmailTaken(updateBody.email, userId))){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
        }
        Object.assign(user, updateBody)
        await user.save()
        return user
    }
    /**
     * Delete user by id
     * @param {ObjectId} userId
     * @returns {Promise<User>}
     */
    async deleteUserById(userId){
        const user = await this.getUserById(userId)
        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND ,'User not found')
        }
        await user.remove()
        return user
    }

}

module.exports = userService