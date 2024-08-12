const {createProxyMiddleware} = require('http-proxy-middleware')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const config = require('../config/config')
const setupProxy = (app, route, target) => {
    app.use (route, createProxyMiddleware({
        target: target,
        changeOrigin: true,
        timeout: config.time.timeout,
        proxyTimeout: config.time.timeout,
        pathRewrite: {
            [`^${route}`] : '/',
        },
        onError: (err, req, res) => {
            console.error(`Error in proxying ${route}:`, err)
            res.status(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Internal error Service ${route} not available`))
        }
    }))
}

module.exports = setupProxy