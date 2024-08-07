const express = require('express')
const auth = require('../middleware/auth.middleware')
const router = express.Router()

//les méthodes doivent être gérée avec des middleware
router.post('/create/patients', auth('patient:create'), (req, res) => {
    //je dois ajouter la méthode de création des patients
    res.send('Patient created')
})

router.post('/send/patients', auth('patient:read'), (req, res) => {
    //je dois ajouter la méthode pour lister les patiens
    res.send('Patients liste')
})

