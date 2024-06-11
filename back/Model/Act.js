const db = require("../utils/dbconnector")

class Act {

    static async createForfaitAct(codeFa, designation, UA, PU_public, PU_contractuel){
        try{
            const params = [codeFa, designation, UA, PU_public, PU_contractuel]
            const sanitizedParams = params.map(value => (typeof value !== 'undefined' ? value : null))
            await db.execute("CALL AddForfaitActe (?,?,?,?,?)", sanitizedParams)
        }catch (error){
            throw error
        }
    }

    static async createForfait(codeF, designationF, natureF, lettreF,COTACT, prixA){
        try{
            const params = [codeF, designationF, natureF, lettreF, COTACT, prixA]
            const sanitizedParams = params.map(value => (typeof  value !== 'undefined' ? value : null))
            await db.execute("CALL AddForfaits (?,?,?,?,?,?)", sanitizedParams)
        }catch (error){
            throw error
        }
    }

    static async modifyAct(codeFa, designation, UA, PU_public, PU_contractuel){
        try{
            //ajouter la procédure pour modifier les forfats d'acte
            await db.execute("CALL ()")
        }catch (error){
            throw error
        }
    }
}

module.exports = Act