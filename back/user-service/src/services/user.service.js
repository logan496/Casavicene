const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
//
// /**
//  * Create a user
//  * @param {Object} userBody
//  * @returns {Promise<User>}
//  */
// const createUser = async (userBody) => {
//     if (await User.isEmailTaken(userBody.email)) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//     }
//     const user = await User.create(userBody);
//     return user;
// };
//
// /**
//  * Query for users
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
// const queryUsers = async (filter, options) => {
//     const users = await User.paginate(filter, options);
//     return users;
// };
//
// /**
//  * Get user by id
//  * @param {ObjectId} id
//  * @returns {Promise<User>}
//  */
// const getUserById = async (id) => {
//     return User.findById(id);
// };
//
// /**
//  * Get user by email
//  * @param {string} email
//  * @returns {Promise<User>}
//  */
// const getUserByEmail = async (email) => {
//     return User.findOne({ email });
// };
//
// /**
//  * Update user by id
//  * @param {ObjectId} userId
//  * @param {Object} updateBody
//  * @returns {Promise<User>}
//  */
// const updateUserById = async (userId, updateBody) => {
//     const user = await getUserById(userId);
//     if (!user) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//     }
//     if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
//         throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//     }
//     Object.assign(user, updateBody);
//     await user.save();
//     return user;
// };
//
// /**
//  * Delete user by id
//  * @param {ObjectId} userId
//  * @returns {Promise<User>}
//  */
// const deleteUserById = async (userId) => {
//     const user = await getUserById(userId);
//     if (!user) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//     }
//     await user.remove();
//     return user;
// };
//
// module.exports = {
//     createUser,
//     queryUsers,
//     getUserById,
//     getUserByEmail,
//     updateUserById,
//     deleteUserById,
// };

class userService {
    async createUser(userBody) {
        // await User.isEmailTaken(userBody.email)
        //     .then(throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken'))
        //     .catch(error => throw error)
        //
        // await User.create(userBody)
        //     .then(user => {
        //         return user
        //     })
        //     .catch(error => throw error)
        if (await User.isEmailTaken(userBody.email)){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
        }
        const user = User.create(userBody)
        return user
    }


    async queryUsers(filter, options){
        // await User.paginate(filter, options)
        //     .then(users => {
        //         return users
        //     })
        //     .catch(error => throw new error)
        const users = await User.paginate(filter, options)
        return users
    }

    async getUserByEmail(email){
        // await User.findOne({email})
        //     .then(user => {
        //         return user
        //     })
        //     .catch(error => throw error)
        //au cas où ça passe pas retourner sur une fonction classique (sans promesses )
        return  await User.findOne({email})
    }
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