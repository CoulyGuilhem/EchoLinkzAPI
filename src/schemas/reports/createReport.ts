import Joi from 'joi';

export const createReportSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow(''),
        category: Joi.string().required(),
        priority: Joi.number().min(1).max(5).required(),
        location: Joi.object({
            type: Joi.string().valid('Point').required(),
            coordinates: Joi.array().items(
                Joi.number().min(-180).max(180), // longitude
                Joi.number().min(-90).max(90)    // latitude
            ).length(2).required()
        }).required()
    })