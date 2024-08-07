const {model, Schema} =  require("mongoose")
const {toJSON, paginate} = require('./plugins')
const {grants, roles} =  require('../config/userRoles')

const UserModel = new Schema({
    name:{
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value) {
            if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)){
                throw new Error('Password must contain at least one letter and one number')
            }
        },
        private: true
    },
    roles: {
        type: [String],
        enum: grants,
        default: 'user',

    },
    userGroup:{
        type: String,
        required: true,
        enum: roles,
    }
},
    {
        timestamps: true
    }
)

UserModel.plugin(toJSON)
UserModel.plugin(paginate)

UserModel.statics.isNameTaken = async function (name, excludeUserId){
    const user = await this.findOne({email, _id: {$ne: excludeUserId}})
    return !!user
}

UserModel.statics.isPasswordMatch = async function(password){
    const user = this;
    return bcrypt.compare(password, user.password)
}

UserModel.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.passive = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = model('User', UserModel)

module.exports = User;