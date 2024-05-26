import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

export const paginate = {
    params: Joi.object().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}