import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "@root/types/express";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token){
        res.status(401).json({ error: "Token missing" });
        return ;
    } 

    jwt.verify(token, JWT_SECRET, (err, userData) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = userData as { id: number; email: string };
        next();
    });
}
