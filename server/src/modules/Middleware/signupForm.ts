import type { RequestHandler } from "express";

import Joi from "joi";

const signupSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Le nom d'utilisateur est requis",
    "any.required": "Le nom d'utilisateur est requis",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "L'email est invalide",
    "any.required": "L'email est requis",
  }),
  password: Joi.string().min(8).max(30).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 8 caractères",
    "string.max": "Le mot de passe doit contenir au plus 30 caractères",
  }),
});

const validateSignupForm: RequestHandler = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
};

export default validateSignupForm;
