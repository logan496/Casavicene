const {createProxyMiddleware} = require('http-proxy-middleware')

const setupProxy = (app, route, target) => {
    app.use (route, createProxyMiddleware({
        target: target,
        changeOrigin: true,
        timeout: 5000,
        proxyTimeout: 5000,
        pathRewrite: {
            [`^${route}`] : '/',
        },
        onError: (err, req, res) => {
            console.error(`Error in proxying ${route}:`, err)
            res.status(500).json({message: `Service ${route} not available`})
        }
    }))
}

module.exports = setupProxy