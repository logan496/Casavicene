const { createProxyMiddleware } = require('http-proxy-middleware');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const setupProxy = (app, route, target) => {
    app.use(route, createProxyMiddleware({
        target: target,
        changeOrigin: true,
        timeout: config.time.timeout,
        proxyTimeout: config.time.timeout,
        pathRewrite: {
            [`^${route}`]: '/',
        },
        on: {
            onProxyReq: (proxyReq, req, res) => {
                if (req.body) {
                    console.log("Request body:", req.body);  // Debug log
                    const bodyData = JSON.stringify(req.body);
                    proxyReq.setHeader('Content-Type', 'application/json');
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));

                    proxyReq.removeHeader('Content-Length');
                    proxyReq.removeHeader('Transfer-Encoding');

                    proxyReq.write(bodyData);
                    proxyReq.end();
                }
            },
        },
        onError: (err, req, res) => {
            console.error(`Error in proxying ${route}:`, err);
            const error = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Internal error: Service ${route} not available`);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }));
};

module.exports = setupProxy;
