const db = require("../utils/dbconnector")

class ParamsAction {
    static async ChoixParams (req, res){
        try{
            const {codeP} = req.body
            const [row] = await db.execute('CALL ChoixPar(?)',codeP)
            if(row>0) res.status(200).json({message: "Récupération réussie", row})
            else res.status(400).json({message: "erreur lors de la récupération ou objet inéxistant"})
        }catch (error){
            res.status(500).json({message: "erreur lors de la récupération des données", error})
        }

    }

    // static async AjoutParams (req, res){
    //     const {codeL, type, libpar, valeur} = req.body
    //     // const sanitizedParams = params.map(value => (typeof value !== 'undefined' ? value : "null"))
    //     await db.excute("CALL AddList(?,?,?,?)", codeL, type, libpar, valeur)
    //         .then(() => res.status(200).json({message: "Ajouter avec success"}))
    //         .catch(error => res.status(500).json({message: "erreurs lors de l'ajout des données", error}))
    // }

    static async GestionRubriqueSoins (req, res){
        const {codeL, libpar, valeur} = req.body
        const type = "soins"
        try {
            await db.execute("CALL AddSoins(?,?,?,?)", [codeL, libpar, valeur, type])
            res.status(200).json({message: "rubriques de soins ajouter avec susccés"})
        }catch (error){
            res.status(500).json({message: "erreur lors de l'ajout"})
        }

    }

    static async GestionFamillesActes (req, res){
        const {codeL, libpar, valeur} = req.body
        const type = "fam_acte"
        try{
            await db.execute("CALL AddFamActe(?,?,?,?)", [codeL, libpar, valeur, type])
            res.status(200).json({message: "Familles d'actes ajouter avec succés"})
        }catch (error){
            res.status(500).json({message: "erreur lors de l'ajout de l'élément"})
        }
    }
}

module.exports = ParamsAction