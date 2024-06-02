import Joi from 'joi';
import enumModel from 'models/enum.model';
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
        functionAdditional: Joi.string().valid(...Object.values(enumModel.EnumUserAccountFunctionAdditional)).required(),
        documents: documentSchema,
        _documents: Joi.array()

    }).options({ allowUnknown: false })
}   

export const validateObjectId = {
    params: Joi.object().keys({
        userAccountId: Joi.objectId().required()
    })
}

export const updateStatus = {
    body: Joi.object().keys({
        status: Joi.string().valid(...Object.values(enumModel.EnumStatusOfUser)).required(),
    }),
    params: Joi.object().keys({
        userAccountId: Joi.objectId().required()
    }) 
}