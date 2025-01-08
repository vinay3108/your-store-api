import express, { Request, Response } from "express";
import { signUp, loginUser,getUsers } from "@root/Controller/user.controller";
import { validateRequest } from "@root/Middlewares/validateRequest.middleware";
import {
    createUserValidation,
    loginUserValidation,
} from "@root/Validation/user.validation";

export default function AccountRouter() {
    const router = express.Router();
    router.route('/').get(getUsers);
    router
        .route("/register")
        .post(validateRequest(createUserValidation), signUp);
    router
        .route("/login")
        .post(validateRequest(loginUserValidation), loginUser);

    return router;
}
