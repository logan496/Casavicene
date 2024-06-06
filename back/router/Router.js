const express = require('express')
const router = express.Router()

//import des modules
const auth = require('../middleware/Auth')
const register = require('../middleware/register')
const ListParams = require("../middleware/ParamsList")
const Action = require("../controller/ParamsAction")
const Client = require("../controller/Client")

router.post("/casavicene")
//connexion et création de compte
router.post("/authentification", auth)
router.post("/register", register)

//affichage d'éléments
router.post("/parametres", ListParams)
router.post("/choix_params", Action.ChoixParams)

//routes d'ajout d'éléments
router.post("/gestionRubriquesSoins", Action.GestionRubriqueSoins)
router.post("/GestionFamilleActes", Action.GestionFamillesActes)
router.post("/new_patient", Client.CreatePatient)

//routes de modification d'éléments
router.post("/Modify_patient", Client.ModifyPatient)

module.exports = router