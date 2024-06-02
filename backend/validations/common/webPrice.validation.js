import Joi from 'joi';
import { EnumPricePrefixes, EnumStatusOfPrice, EnumTypeOfPrice } from 'models/enum.model'
Joi.objectId = require('joi-objectid')(Joi);


export const paginate = {
    params: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

export const createWebPrice= {
    body: Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string().valid(...Object.values(EnumTypeOfPrice)).required(),
        priceChart: Joi.array().items({
            index: Joi.number().required(),
            from: Joi.string().valid(...Object.values(EnumPricePrefixes)).required(),
            to: Joi.string().valid(...Object.values(EnumPricePrefixes)).required(),
            price: Joi.number().required(),
        }).required(),
        status: Joi.string().valid(...Object.values(EnumStatusOfPrice))
    }).options({ allowUnknown: false })
}

export const updateWebPrice= {
    body: Joi.object().keys({
        name: Joi.string(),
        type: Joi.string().valid(...Object.values(EnumTypeOfPrice)),
        priceChart: Joi.array().items({
            index: Joi.number().required(),
            from: Joi.string().valid(...Object.values(EnumPricePrefixes)),
            to: Joi.string().valid(...Object.values(EnumPricePrefixes)),
            price: Joi.number().required()
        }),
        status: Joi.string().valid(...Object.values(EnumStatusOfPrice))
    }).options({ allowUnknown: false }),
    params: Joi.object().keys({
        webPriceId: Joi.objectId().required(),
    })
}

export const validateObjectId = {
    params: Joi.object().keys({
        webPriceId: Joi.objectId().required()
    })
}

export const updateStatus = {
    body: Joi.object().keys({
        status: Joi.string().valid(...Object.values(EnumStatusOfPrice)).required(),
    }),
    params: Joi.object().keys({
        webPriceId: Joi.objectId().required()
    }) 
}