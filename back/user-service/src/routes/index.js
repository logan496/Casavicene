const express = require('express')
const authRoute = require('./auth.route')
const userRoute = require('./user.routes')
const config = require('../config/config')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/users',
        route: userRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router