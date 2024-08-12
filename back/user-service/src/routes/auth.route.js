const express = require('express')
const validate = require('../middleware/validate')
const authValidation = require('../validation/auth.validation')
const authController = require('../controllers/auth.controller')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const {validator} = require('../middleware/validator')
const {userValidationRules} = require('../validation/demandeur.validation')


router.post('/register', validate(authValidation.register), authController.register)
router.post('/login', validate(authValidation.login), authController.login)
router.post('/logout', validate(authValidation.logout), authController.logout)
router.post(
    'user',
    userValidationRules,
    validator,
    catchAsync(async (req, res) => {
        return res.status(200).json({ ok: "ok"})
    })
)
module.exports = router