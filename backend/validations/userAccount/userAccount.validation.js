import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

const documentSchema = Joi.array().items(Joi.object({
    // data: Joi.binary().required(),
    contentType: Joi.string(),
    documentName: Joi.string()
})).options({ allowUnknown: true })

export const createUserAccount = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        password: Joi.string().required(),
        documents: documentSchema,
        _documents: Joi.array()

    }).options({ allowUnknown: false })
}   

export const validateObjectId = {
    params: Joi.object().keys({
        userAccountId: Joi.objectId().required()
    })
}