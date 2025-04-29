import Joi from 'joi';

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Format d’email invalide.',
    'any.required': 'L’email est requis.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
    'any.required': 'Le mot de passe est requis.'
  })
});