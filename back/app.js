const express = require("express")
const app = express()
const router = require('./router/Router')
const routerDoc = require('./router/routerDoc')
const routerInf = require('./router/routerInf')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/admin', router)
// app.use('/docteur' ,routerDoc)
// app.use('/infirmieres', routerInf)

app.listen(3000, ()=>{
    console.log('Serveur démarré sur le port 3000')
})
