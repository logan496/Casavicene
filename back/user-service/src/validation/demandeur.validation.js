const {check} = require('express-validator')

const userValidationRules = () =>{
    return [
        check('email').isEmail(),
        check('password').isLength({min: 5})
    ]
}

module.exports = {
    userValidationRules
}