const limiter = require('express-rate-limit')

const autLimiter = limiter({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skipSuccessfulRequests: true
})

module.exports = {
    autLimiter
}