const express = require('express')
const morgan = require('morgan')
const config = require('./config/config')
const setupProxy = require("./config/proxy")
const app = express()
const cors = require("cors")
const httpStatus = require("http-status")
const ApiError = require("./utils/ApiError")

require('dotenv').config()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))



const corsOptions = {
    origin: '',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

setupProxy(app,"/Users", config.services.user)
setupProxy(app,"/Client", config.services.client)
setupProxy(app,"/ReceptionCaisse", config.services.reception_caisse)
setupProxy(app,'/Notification', config.services.notification)

app.use((req, res,next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

const PORT = config.port

app.listen(PORT, () => {
    console.log(`API Gateway lancée sur le port ${PORT}`)
})