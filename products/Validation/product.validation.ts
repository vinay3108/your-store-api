import Joi from "joi";

// Validation schema for creating a product
export const createProductValidation = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
        'string.base': 'Name should be a string.',
        'string.min': 'Name should have at least 3 characters.',
        'string.max': 'Name should have at most 255 characters.',
        'any.required': 'Name is required.'
    }),
    type: Joi.string().max(255).optional().messages({
        'string.base': 'Type should be a string.',
        'string.max': 'Type should have at most 255 characters.'
    }),
    brand: Joi.string().max(255).optional().messages({
        'string.base': 'Brand should be a string.',
        'string.max': 'Brand should have at most 255 characters.'
    }),
    imageUrl: Joi.string().uri().optional().messages({
        'string.base': 'Image URL should be a string.',
        'string.uri': 'Image URL must be a valid URL.'
    }),
    rating: Joi.number().min(0).max(5).optional().messages({
        'number.base': 'Rating should be a number.',
        'number.min': 'Rating should be at least 0.',
        'number.max': 'Rating should be at most 5.'
    }),
});

// Validation schema for updating a product
export const updateProductValidation = Joi.object({
    name: Joi.string().min(3).max(255).optional().messages({
        'string.base': 'Name should be a string.',
        'string.min': 'Name should have at least 3 characters.',
        'string.max': 'Name should have at most 255 characters.'
    }),
    type: Joi.string().max(255).optional().messages({
        'string.base': 'Type should be a string.',
        'string.max': 'Type should have at most 255 characters.'
    }),
    brand: Joi.string().max(255).optional().messages({
        'string.base': 'Brand should be a string.',
        'string.max': 'Brand should have at most 255 characters.'
    }),
    imageUrl: Joi.string().uri().optional().messages({
        'string.base': 'Image URL should be a string.',
        'string.uri': 'Image URL must be a valid URL.'
    }),
    rating: Joi.number().min(0).max(5).optional().messages({
        'number.base': 'Rating should be a number.',
        'number.min': 'Rating should be at least 0.',
        'number.max': 'Rating should be at most 5.'
    }),
});

export const deleteProductValidation = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID should be a number.',
        'number.integer': 'ID should be an integer.',
        'number.positive': 'ID should be a positive number.',
        'any.required': 'ID is required.'
    }),
});