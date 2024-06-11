const Patient = require("../Model/Client")

class Client{

    static async CreationPatient(req, res){
        const {typeC, Assureur, courtier, employeur, divers, codeC, raisonS, numContri, numRC, Echeance, tauxTVA, RefPEC, ticketM, Suspendu,motif, memo, createOn, majOn, postalBox, ville, adresse, pays, tel, email} =  req.body
        await Patient.CreateClient(typeC, Assureur, courtier, employeur, divers, codeC, raisonS, numContri, numRC, Echeance, tauxTVA, RefPEC, ticketM, Suspendu,motif, memo, createOn, majOn, postalBox, ville, adresse, pays, tel, email)
            .then(() => res.status(200).json({message: "Nouveau client ajouter avec succés"}))
            .catch(error => res.status(500).json({message: "Erreur lors de l'ajout du nouveau client", error}))
    }

    static async ModifiactionPatient(req, res){
        const {codeC, typeC, Assureur, courtier, employeur, divers, raisonS, numContri, numRC, Echeance, tauxTVA, RefPEC, ticketM, Suspendu, postalBox, ville, adresse, pays, tel, email} = req.body
        await Patient.ModifyPatient(codeC, typeC, Assureur, courtier, employeur, divers, raisonS, numContri, numRC, Echeance, tauxTVA, RefPEC, ticketM, Suspendu, postalBox, ville, adresse, pays, tel, email)
            .then(() => res.status(200).json({message: "Client modifier avec succés"}))
            .catch(error => res.status(500).json({message: "Erreur lors de la modification du client", error}))
    }

}

module.exports = Client