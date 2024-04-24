import Joi from 'joi';
import enumModel from 'models/enum.model';
Joi.objectId = require('joi-objectid')(Joi);

export const loginUser = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        userType: Joi.string().valid(...Object.values(enumModel.EnumRoleOfUser)),
    }).options({ allowUnknown: false })
}

export const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required()
    }),
};

export const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};