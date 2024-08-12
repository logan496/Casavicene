const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const router = require('./routes/auth.route')
const ApiError = require('./utils/ApiError')
const {jwtStrategy} = require("./config/passport");
const httpStatus = require("http-status");
const config =  require('./config/config')
const morgan = require('./config/morgan')
const {authLimiter} = require('./middleware/limiter')
const {errorConverter, errorHandler} = require('./middleware/error')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')

dotenv.config()

const app = express()

if(config.env !== 'test'){
    app.use(morgan.successhandler)
    app.use(morgan.errorHandler)
}
//sécurité sur les headers des requêtes http
app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use(xss())
app.use(mongoSanitize())

app.use(compression())

app.use(cors())
app.option('*', cors())


// if(config.env === "production"){
//     app.use('/Users/auth', authLimiter)
// }

app.use('/auth', router)

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// converti les erreursen ApiError, si nécessaire
app.use(errorConverter)

//gére les erreurs
app.use(errorHandler)

module.exports = app