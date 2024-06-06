const db = require("../utils/dbconnector")

async function List(req, res){
    try{
        const [row] = await db.execute('CALL ListeParametres')
        if(row>0){
            res.status(200).json({message: "opération réussie", row})
        }else {
            res.status(400).json({message: 'erreur lors de la récupération des données'})
        }
    }catch (error){
        res.status(500).json({message: 'internal error', error})
    }
}

module.exports = List