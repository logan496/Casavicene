const mongoose = require('mongoose')
const {toJSON} = require('./plugins')
const {tokenTypes} = require('../config/tokens')
const {model, Schema} = require('mongoose')

const tokenSchema = Schema({
    token: {
        types: String,
        require: true,
        index: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD],
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    blacklisted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
    }
)

tokenSchema.plugin(toJSON)

const Token = model('Token', tokenSchema)

module.exports = Token