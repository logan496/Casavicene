const db = require("../utils/dbconnector")
class Find {

    static async FindBySoins (req, res){
        try{
            const {rubSoins} = req.body
            await db.execute("CALL ListBySoins(?)", rubSoins)
            res.status(200).json({message: "opération réussie"})
        }catch (error){
            res.status(400).json({message: "échec de l'opération", error})
        }

    }

    static async FindByActFamilly (req, res){
        try{
            const {actFam} = req.body
            await db.execute("CALL ListByAct(?)", actFam)
            res.status(200).json({message: "opération réussie"})
        }catch (error){
            res.status(400).json({message: "échec de l'opération", error})
        }
    }

    static async affActFam (req, res){
        try{
            const {valeur} = req.body
            const type = "familleActe" // en attendant que je définisse les types on va mettre ça par défaut
            const [row] = await db.execute("CALL AffActFam(?,?)", [valeur, type])
            if(row > 0) res.status(200).json({message: "opération réussie", row})
            else res.status(400).json({message: "valeur entrée inexistante"})
        }catch (error){
            res.status(500).json({message: "internal error", error})
        }
    }
    static async ActByContractuelPU(req, res){
        try{
            const [row] = await db.execute("CALL TriParPUC")
            if(row > 0) res.status(200).json({message: "opération", row})
            else res.status(400).json({message: "échec de l'opération"})
        }catch (error){
            res.status(500).json({message: "échec de l'opération", error})
        }
    }

    static async findPatientByName(req, res){
        try{
            const {name} = req.body
            const [row] = await db.execute("CALL AffFicheSignaletique(?)", name)
            if(row>0) res.status(200).json({message: "opération réussie", row})
            else res.status(400).json({message: "le nom entrer n'éxiste pas"})
        }catch (error){
            res.status(500).json({message: "échec de l'opération", error})
        }
    }

    
}

module.exports = Find