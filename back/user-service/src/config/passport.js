const {Stategy: JwtSrategy, ExtractJwt} = require('passport-jwt')
const User = require('../models/User.model')
const config = require('../config/config')
const opts = {
    _jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: config.jwt.secret,
}
//
// passport.use(
//     new JwtSrategy(opts, async (jwtPayload, done) => {
//         try{
//             const user = await user.findById(jwtPayload)
//             if(user){
//                 return done(null, user)
//             }
//             return done(null, false)
//         }catch (err) {
//             return done(err, false)
//         }
//     } )
// )
//

const jwtVerify = async( payload, done) => {
    try {
        const user = await User.findById(payload.sub)
        if(!user){
            return done(null, false)
        }
        return done(null, user)
    }catch (error){
        return done(error, false)
    }
}

const jwtStrategy =  new JwtSrategy(opts, jwtVerify)

module.exports = {
    jwtStrategy
}