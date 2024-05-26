import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

export const paginate = {
    params: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

export const createCrmQuery= {
    body: Joi.object().keys({
        email: Joi.string().required(),
        phone: Joi.number().required(),
        message: Joi.string().required(),
    }).options({ allowUnknown: false })
}

export const updateCrmQuery= {
    body: Joi.object().keys({
        email: Joi.string(),
        phone: Joi.number(),
        message: Joi.string(),
    }).options({ allowUnknown: false }),
    params: Joi.object().keys({
        crmQueryId: Joi.objectId().required(),
    })
}

export const validateObjectId = {
    params: Joi.object().keys({
        crmQueryId: Joi.objectId().required()
    })
}