import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });
    
        if (error) {
            const errors = error.details.map((detail) => ({
            message: detail.message,
            field: detail.context?.key,
            }));
          res.status(400).json({ errors }); // Ends the response process
          return; // Ensure no further execution
        }
    
        next(); // Pass control to the next middleware or route handler
    };
};
