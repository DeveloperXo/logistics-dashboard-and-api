import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

export const paginate = {
    params: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

export const createVehicle = {
    body: Joi.object().keys({
        vehicleName: Joi.string().required(),
        width: Joi.number().required(),
        height: Joi.number().required(),
        weight: Joi.number().required(),
        description: Joi.string().required(),
        baseCharge: Joi.number().required(),
        additionalServiceCharge: Joi.number().required(),
        baseFareByKm: Joi.array().items(Joi.object({
            from: Joi.number().required(),
            to: Joi.number().required(),
            price: Joi.number().required()
        })).required(),
        image: Joi.string()
    }).options({ allowUnknown: false })
}

export const updateVehicle = {
    body: Joi.object().keys({
        vehicleName: Joi.string(),
        width: Joi.number(),
        height: Joi.number(),
        weight: Joi.number(),
        description: Joi.string(),
        baseCharge: Joi.number(),
        additionalServiceCharge: Joi.number(),
        baseFareByKm: Joi.array().items(Joi.object({
            from: Joi.number(),
            to: Joi.number(),
            price: Joi.number()
        })),
        image: Joi.string()
    }).options({ allowUnknown: false }),
    params: Joi.object().keys({
        vehicleId: Joi.objectId().required(),
    })
}

export const validateObjectId = {
    params: Joi.object().keys({
        vehicleId: Joi.objectId().required()
    })
}