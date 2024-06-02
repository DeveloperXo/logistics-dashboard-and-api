import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

export const paginate = {
    params: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

export const createWallet = {
    body: Joi.object().keys({
        customerId: Joi.string().required(),
        balance: Joi.number().required(),
        lastRechargeDate: Joi.string().required()
    }).options({ allowUnknown: false })
}

export const updateWallet = {
    body: Joi.object().keys({
        body: Joi.object().keys({
            customerId: Joi.string(),
            balance: Joi.number(),
            lastRechargeDate: Joi.string()
        }).options({ allowUnknown: false })
    }).options({ allowUnknown: false }),
    params: Joi.object().keys({
        walletId: Joi.objectId().required(),
    })
}

export const validateObjectId = {
    params: Joi.object().keys({
        walletId: Joi.objectId().required()
    })
}

export const validateObjectId_user = {
    params: Joi.object().keys({
        userId: Joi.objectId().required()
    })
}