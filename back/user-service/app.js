const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const router = require('./src/routes/router')
const {jwtStrategy} = require("./src/config/passport");
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('User service')
})

app.use(passport.initialize())
passport.use(jwtStrategy)

app.use('/users', router)

// app.use((err, req, res, next) => {
//     res.status(err.statusCode || 500).json({
//         message: err.message || 'Internal server error'
//     })
// })


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Service utilisateur lancer sur le port ${PORT}`)
})