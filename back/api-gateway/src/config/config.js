const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({path: path.join(__dirname, '../../.env')})

const envVarsSchema = Joi.object()
.keys({
    PORT: Joi.number().default(3000),
    USER_SERVICE_URL: Joi.string().required().description('URL for the user service'),
    RECEPTIONCAISSE_SERVICE_URL: Joi.string().required().description('URL for the recetion/caisse service'),
    NOTIFICATION_SERVICE_URL: Joi.string().required().description('URL for the notification service'),
    CLIENT_SERVICE_URL: Joi.string().required().description('URL for the client service')
})
.unknown()

const {value: envVars, error} = envVarsSchema.prefs({errors: {label: 'key'}}).validate(process.env)

if(error){
    throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
    port: envVars.PORT,
    services: {
        user: envVars.USER_SERVICE_URL,
        reception_caisse: envVars.RECEPTIONCAISSE_SERVICE_URL,
        notification: envVars.NOTIFICATION_SERVICE_URL,
        client: envVars.CLIENT_SERVICE_URL
    }
}