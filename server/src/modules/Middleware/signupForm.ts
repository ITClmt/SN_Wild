import type { RequestHandler } from "express";

import Joi from "joi";

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Le nom d'utilisateur est requis",
    "any.required": "Le nom d'utilisateur est requis",
    "string.min": "Le nom d'utilisateur doit contenir au moins 3 caractères",
    "string.max": "Le nom d'utilisateur doit contenir au plus 30 caractères",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "L'email est invalide",
    "any.required": "L'email est requis",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères",
    "string.max": "Le mot de passe doit contenir au plus 30 caractères",
  }),
});

interface ValidationError {
  field: string;
  message: string;
}

const validateSignupForm: RequestHandler = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    const formattedError: ValidationError = {
      field: error.details[0].path[0] as string,
      message: error.details[0].message,
    };
    res.status(400).json(formattedError);
    return;
  }
  next();
};

export default validateSignupForm;
