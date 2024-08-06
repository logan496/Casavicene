const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const router = require('./src/routes/router')
dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('User service')
})

app.use(passport.initialize())

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