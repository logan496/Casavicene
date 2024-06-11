const express = require('express');
const router = express.Router();

// Import des modules
const auth = require('../middleware/Auth');
const register = require('../middleware/register');
const ListParams = require("../middleware/ParamsList");
const Action = require("../controller/ParamsAction");
const ActClient = require("../controller/Client")
const FindElement = require("../controller/find")


// Connexion et création de compte
router.post("/authentification", auth);
router.post("/register", register);

// Affichage d'éléments
router.post("/parametres", ListParams);
router.post("/choix_params", Action.ChoixParams);
router.post("/affFamillesAct", FindElement.affActFam)
router.post("/actByPUC", FindElement.ActByContractuelPU)//route pour afficher les familles d'actes avec des PU contractuel

// Routes d'ajout d'éléments
router.post("/gestionRubriquesSoins", Action.GestionRubriqueSoins);
router.post("/gestionFamilleActes", Action.GestionFamillesActes);
router.post("/patient", ActClient.CreationPatient);

// Routes de modification d'éléments
router.post("/modify_patient", ActClient.ModifiactionPatient);

module.exports = router;
