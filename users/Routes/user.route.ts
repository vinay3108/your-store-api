import { Router } from "express";
import { UserController } from "@root/Controller/user.controller";
import { authenticateToken } from "@root/Middlewares/auth.middleware";

const router = Router();
router.route('/').get(UserController.getUsers);
router.get("/profile", authenticateToken, UserController.getProfile);
router.put("/profile", authenticateToken, UserController.updateProfile);

export default router;
