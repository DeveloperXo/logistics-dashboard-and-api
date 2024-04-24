import Joi from 'joi';
import enumModel from 'models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);

export const createAdmin = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobileNumber: Joi.number().integer(),
        role: Joi.string().valid(...Object.values(enumModel.EnumRoleOfUser)),
        password: Joi.string().required()
    }).options({ allowUnknown: false })
}

export const updateAdmin = {
    body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        mobileNumber: Joi.number().integer(),
        role: Joi.string().valid(...Object.values(enumModel.EnumRoleOfUser)),
        password: Joi.string()
    }).options({ allowUnknown: false }),
    params: Joi.object().keys({
        adminId: Joi.objectId().required(),
    })
}