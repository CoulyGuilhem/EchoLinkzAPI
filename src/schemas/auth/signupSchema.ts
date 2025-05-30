import Joi from 'joi';

export const signupSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': 'Le nom d’utilisateur doit être une chaîne de caractères.',
    'string.min': 'Le nom d’utilisateur doit contenir au moins 3 caractères.',
    'any.required': 'Le nom d’utilisateur est requis.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Format d’email invalide.',
    'any.required': 'L’email est requis.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
    'any.required': 'Le mot de passe est requis.'
  })
});