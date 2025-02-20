import { Request, Response } from "express";
import  {AuthService}  from "@root/Services/auth.service";

const authService = new AuthService();

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const { email, password, full_name, phone } = req.body;
            console.log(req.body);
            const user = await authService.register(email, password, full_name, phone);
            res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}
