const Joi = require('joi')
const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')

const validate = (schema) => (req, res, next) => {
    // Sélectionner les parties pertinentes du schéma
    const validSchema = pick(schema, ['params', 'query', 'body'])

    //Sélectionner les parties correspondantes de la requête
    const object = pick(req, Object.keys(validSchema))

    //valider l'objet sélectionné par rapport au schéma
    const {value, error} = Joi.compile(validSchema)
        .prefs({errors: {label: 'key'}})
        .validate(object)

    if(error) {
        const errorMessage = error.details.map((details ) => details.message).join(', ')
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate


