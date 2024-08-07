const express = require("express")
const app = express()
const dotenv = require('dotenv')

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("Acts service")
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Acts service démarrer sur le port ${PORT}`)
})