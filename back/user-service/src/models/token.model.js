// const mongoose = require('mongoose')
const {toJSON} = require('./plugins')
const {tokenTypes} = require('../config/tokens')
const {model, Schema} = require('mongoose')

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        index: true
    },
    user: {
        // type: mongoose.SchemaTypes.ObjectId,
        type: Schema.Types.ObjectId,
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


/**
 * @typedef Token
 */
const Token = model('Token', tokenSchema)

module.exports = Token