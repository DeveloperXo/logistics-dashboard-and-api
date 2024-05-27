import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
import { EnumTypeOfTransaction } from 'models/enum.model'

export const paginate = {
    params: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

export const createWalletTransaction = {
    body: Joi.object().keys({
        customerId: Joi.string().required(),
        amount: Joi.number().required(),
        docketNumber: Joi.string().required(),
        amountType: Joi.string().valid(...Object.values(EnumTypeOfTransaction)).required(),
        comment: Joi.string().required(),
        receipt: Joi.string(),
    }).options({ allowUnknown: false })
}

export const updateWalletTransaction = {
    body: Joi.object().keys({
        customerId: Joi.string(),
        amount: Joi.number(),
        docketNumber: Joi.string(),
        amountType: Joi.string().valid(...Object.values(EnumTypeOfTransaction)),
        comment: Joi.string(),
        receipt: Joi.string(),
    }).options({ allowUnknown: false }),
    params: Joi.object().keys({
        walletTransactionId: Joi.objectId().required(),
    })
}

export const validateObjectId = {
    params: Joi.object().keys({
        walletTransactionId: Joi.objectId().required()
    })
}

export const validateCustomerIdId = {
    params: Joi.object().keys({
        customerId: Joi.objectId().required()
    })
}