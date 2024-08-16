const express = require('express')
const auth = require('../middleware/auth.middleware')
const validate = require('../middleware/validate')
const userValidation = require('../validation/user.validation')
const userController = require('../controllers/user.controller')

const router = express.Router()

router
    .route('/')
    .post(auth('user:create'), validate(userValidation.createUser), userController.createUser)
    .get(auth('user:read'), validate(userValidation.getUsers), userController.getUsers)


router
    .route('/:userId')
    .get(auth('user:read'), validate(userValidation.getUser), userController.getUser)
    .patch(auth('user:update'), validate(userValidation.updateUser), userController.updateUser)
    .delete(auth('user:delete'), validate(userValidation.deleteUser), userController.deleteUser)

module.exports = router