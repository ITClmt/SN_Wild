import type { RequestHandler } from "express";

import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "L'email est invalide",
    "any.required": "L'email est requis",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    "string.max": "Le mot de passe doit contenir au plus 30 caractères",
  }),
});

const validateLoginForm: RequestHandler = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};

export default validateLoginForm;
