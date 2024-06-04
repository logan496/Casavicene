const express = require('express')
const router = express.Router()

const auth = require('../middleware/Auth')
const register = require('../middleware/register')

router.post("/casavicene")
router.post("/authentification", auth)
router.post("/register", register)


module.exports = router