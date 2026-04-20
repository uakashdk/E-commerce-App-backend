import Joi from "joi";

export const createCategorySchema = Joi.object({
     name: Joi.string().required(),
      description: Joi.string().optional(),
})

export const UpdateCategorySchema = Joi.object({
    name: Joi.string().required(),  
})