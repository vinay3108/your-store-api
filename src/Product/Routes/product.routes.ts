import express, { Request, Response } from "express";
import { signUp, loginUser,getUsers } from "./Controller/user.controller";
import { validateRequest } from "@globalMiddleware/validateRequest.middleware";
import {
    createUserValidation,
    loginUserValidation,
} from "./Validation/user.validation";

export default function AccountRouter() {
    const router = express.Router();
    router.route('/').get(getUsers);
    router
        .route("/create")
        .post(validateRequest(createUserValidation), signUp);
    router
        .route("/login")
        .post(validateRequest(loginUserValidation), loginUser);

    return router;
}
