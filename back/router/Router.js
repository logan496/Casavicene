const express = require('express');
const router = express.Router();

// Import des modules
const auth = require('../middleware/Auth');
const register = require('../middleware/register');
const ListParams = require("../middleware/ParamsList");
const Action = require("../controller/ParamsAction");
const ActClient = require("../controller/Client")

// Route principale (semble être une route par défaut, mais elle n'a pas de gestionnaire)
// router.post("/casavicene"); // Cette ligne semble inutile sans gestionnaire

// Connexion et création de compte
router.post("/authentification", auth);
router.post("/register", register);

// Affichage d'éléments
router.post("/parametres", ListParams);
router.post("/choix_params", Action.ChoixParams);

// Routes d'ajout d'éléments
router.post("/gestionRubriquesSoins", Action.GestionRubriqueSoins);
router.post("/gestionFamilleActes", Action.GestionFamillesActes); // Correction du nom de la route
router.post("/patient", ActClient.CreationPatient);

// Routes de modification d'éléments
router.post("/modify_patient", ActClient.ModifiactionPatient); // Correction du nom de la route

module.exports = router;
