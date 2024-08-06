const rbac = require('../config/userRoles')
const User = require('../models/User.model')

const checkPermission = (action, resource) =>  {
    return async (req, res, next) => {
        const user = req.user

        let isAllowed = false

        for(let role of user.roles){
            if(await  rbac.can(role, `${resource}:${action}`)){
                isAllowed = true
                break
            }
        }

        if (isAllowed){
            next()
        }else{
            res.status(403).send('Permission denied')
        }
    }
}

module.exports = checkPermission