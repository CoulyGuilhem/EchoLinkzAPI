import Joi from 'joi';

export const chatSchema = Joi.object({
  threadId: Joi.string().optional(),
  message: Joi.string().min(1).required()
});
