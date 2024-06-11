const Acte = require("../Model/Act")

class Act{

    static async CreateForfaitActe(req, res){
        const {codeFa, designation, UA, PU_public, PU_contractuel} = req.body
        await Acte.createForfaitAct(codeFa, designation, UA, PU_public, PU_contractuel)
            .then(() => res.status(200).json({message: "forfaits d'acte créer avec succés"}))
            .catch(error => res.status(500).json({message: "erreur lors de l'ajout de l'act", error}))
    }

    static async CreateForfait(req, res){
        const {codeF, designationF, natureF, lettreF,COTACT, prixA} = req.body
        await Acte.createForfait(codeF, designationF, natureF, lettreF, COTACT, prixA)
            .then(() => res.status(200).json({message: "forfaits ajouter"}))
            .catch(error => res.status(500).json({message: "erreur lors de l'ajout", error}))
    }
}