const User = require("../Model/user")
const jwt = require("jsonwebtoken")

async function login(req, res){
    const {name, password} = req.body
    try{
        const user = await User.authenticate(name, password)
        if(user){
            const userId = user.id
            const Role =  user.role
            const token = jwt.sign({userId, name}, 'secretKey', {expiresIn: '4h'})
            res.status(200).json({message: 'Connexion réussie', Role,userId, token})
        }else{
            console.error("Email ou mot de passe incorrect")
            res.status(400).json({message: "Email ou mot de passe incorrect"})
        }
    } catch (error){
        console.error("Erreur lors de l'authentification")
        res.status(500).json({message: 'Erreurs lors de l\'authentification', error})
    }
}

module.exports = login