import { Request,Response } from "express";
import { UserService } from "@root/Services/user.service";
import { AuthenticatedRequest } from "@root/types/express";
import dbConnection from "@root/DB/db.connection";
import { User } from "@root/Model/users.model";

const userService = new UserService();
const userRepository = dbConnection.getRepository(User);

export class UserController {
    static async getUsers(req:Request, res:Response) {
        try {
            const user = await userRepository.find();
            res.status(200).json({ user });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    static async getProfile(req: AuthenticatedRequest, res: Response) {
        try {
            const user = await userService.getUserById(req.user.id);
            const { password_hash, ...userProfile } = user;
            res.json({ profile: userProfile });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateProfile(req: AuthenticatedRequest, res: Response) {
        try {
            const { full_name, phone } = req.body;
            const user = await userService.updateUser(req.user.id, full_name, phone);
            res.json({ message: "Profile updated successfully", user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
