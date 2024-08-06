const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

async function Connect(){
    await mongoose.connect(process.env.MONGO_DB_URL)
        .then(()=> console.log("Connection à MongoDB réussie"))
        .catch(err => console.log("Connection à mongoDB échouée", err))
}

module.exports = Connect