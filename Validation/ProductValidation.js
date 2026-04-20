import Joi from "joi";

// ===============================
// Product Validation Schema
// ===============================
export const createProductValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  countInStock: Joi.number().required(),
});

export const updateProductValidation = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  category: Joi.string(),
  countInStock: Joi.number(),
});