const express = require("express")
const app = express()
const router = require('./router/Router')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)
app.listen(3000, ()=>{
    console.log('Serveur démarré sur le port 3000')
})
