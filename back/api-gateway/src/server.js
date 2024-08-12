const express = require('express')
const morgan = require('morgan')
const {createProxyMiddleware} = require('http-proxy-middleware')
const http = require("http");
const config = require('./config/config')
const setupProxy = require("./config/proxy")
const app = express()
const cors = require("cors")

require('dotenv').config()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const corsOptions = {
    origin: '',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

setupProxy(app,"/Users", config.services.user)
setupProxy(app,"/Client", config.services.client)
setupProxy(app,"/ReceptionCaisse", config.services.reception_caisse)
setupProxy(app,'/Notification', config.services.notification)

app.use((req, res) => {
    res.status(404).json({message: 'Ressource not found'})
})

const PORT = config.port

app.listen(PORT, () => {
    console.log(`API Gateway lancée sur le port ${PORT}`)
})