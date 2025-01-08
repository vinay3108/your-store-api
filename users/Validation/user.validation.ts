import Joi from "joi";
export const createUserValidation = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string.',
    'string.min': 'Name should have at least 3 characters.',
    'string.max': 'Name should have at most 30 characters.',
    'any.required': 'Name is required.'
    }),
    email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.'
    }),
    password: Joi.string().min(6).max(20).required().messages({
    'string.base': 'Password should be a string.',
    'string.min': 'Password should have at least 6 characters.',
    'string.max': 'Password should have at most 20 characters.',
    'any.required': 'Password is required.'
    }),
    role:Joi.string()
});

export const loginUserValidation = Joi.object({
    email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.'
    }),
    password: Joi.string().min(6).max(20).required().messages({
    'string.base': 'Password should be a string.',
    'string.min': 'Password should have at least 6 characters.',
    'string.max': 'Password should have at most 20 characters.',
    'any.required': 'Password is required.'
    }),
});