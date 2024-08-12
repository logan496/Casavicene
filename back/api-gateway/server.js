const express = require('express')
const morgan = require('morgan')
const {createProxyMiddleware} = require('http-proxy-middleware')
const http = require("http");

require('dotenv').config()


const app =  express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/Users", createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    timeout: 5000,
    proxyTimeout: 5000,
    onError: (err, req, res) => {
        res.status(500).json({messsage: 'Service Users isn\'t available'})
    }
}))

app.use('/Client', createProxyMiddleware({
    target: process.env.CLIENT_SERVICE_URL,
    changeOrigin: true
}))

app.use('/ReceptionCaisse', createProxyMiddleware({
    target: process.env.RECEPTIONCAISSE_SERVICE_URL,
    changeOrigin: true,

}))

app.use('/Notif', createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE_URL,
    changeOrigin: true
}))

app.use((req, res) => {
    res.status(404).json({message: 'Ressource not found'})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`API Gateway lancée sur le port ${PORT}`)
})