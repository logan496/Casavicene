const user = require('../Model/user')

async function Register(req, res){
    const {name, password} = req.body
    await user.register(name, password)
        .then(() => res.status(200).json({message: "Compte créer avec success"}))
        .catch(error => res.status(500).json({message: 'Erreurs lors de la création du compte', error}))

}

module.exports = Register