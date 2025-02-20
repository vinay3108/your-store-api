import express  from "express";
require('module-alias/register');
import bodyParser from "body-parser";
import { Request,Response } from "express";
import userRouter from '@root/Routes/user.route';
import authRouter from '@root/Routes/auth.route';
import dbConnection from "./DB/db.connection";

import dotenv from 'dotenv';

const app = express();

dotenv.config()

const port = process.env.PORT || 5007;
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

const startApp = async () => {
    try {
        const mysql = await dbConnection.initialize();
        console.log("MYSQL connected:", mysql.isInitialized);
        app.get('/',(req:Request ,res:Response)=>{
            res.send("hello from users");
        })
        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        })
        app.use('/users', userRouter);
        app.use('/auth', authRouter);
    } catch (err) {
        console.error("Failed to start application due to DB error:", err);
        process.exit(1); // Exit the application on failure
    }
};

startApp();