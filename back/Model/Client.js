const db = require("../utils/dbconnector")

class Patient {

    static async CreateClient(typeC, Assureur, courtier, employeur, divers, codeC, raisonS, numContri, numRC, Echeance, tauxTVA, RefPEC, ticketM, Suspendu, memo, createOn, majOn, suspensionDate, postalBox, ville, adresse, pays, tel, email) {
        try {
            const [result] = await db.execute("CALL AddClient(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [typeC, Assureur, courtier, employeur, divers, codeC, raisonS, numContri, numRC, Echeance, tauxTVA, RefPEC, ticketM, Suspendu, memo, createOn, majOn, suspensionDate, postalBox, ville, adresse, pays, tel, email])
        } catch (error) {
            throw error
        }
    }

    static async ModifyPatient(codeC, typeC, Assureur, courtier, employeur, divers, raisonS, numContri, numRC, Echeance, tauxTVA, RefPEC, ticketM, Suspendu, postalBox, ville, adresse, pays, tel, email) {
        try {
            const [result] = await db.execute("CALL UpdateClient(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [typeC, Assureur, courtier, employeur, divers, codeC, raisonS, numContri, numRC, Echeance, tauxTVA, RefPEC, ticketM, Suspendu, postalBox, ville, adresse, pays, tel, email])
        } catch (error) {
            throw error
        }
    }


}

module.exports = Patient