const {Stategy: JwtSrategy, ExtractJwt} = require('passport-jwt')
const User = require('../models/User.model')
const passport = require('passport')
const opts = {
    _jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: process.env.JWT_SECRET,
}

passport.use(
    new JwtSrategy(opts, async (jwtPayload, done) => {
        try{
            const user = await user.findById(jwtPayload)
            if(user){
                return done(null, user)
            }
            return done(null, false)
        }catch (err) {
            return done(err, false)
        }
    } )
)