import express  from "express";
require('module-alias/register');
import { Request,Response } from "express";

import dotenv from 'dotenv';

const app = express();

dotenv.config()

const port = process.env.PORT || 5006;
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

const startApp = async () => {
    try {
        app.get('/',(req:Request ,res:Response)=>{
            res.send("hello from products");
        })
        app.get('/product',(req:Request,res:Response)=>{
            res.send("viny");
        })
        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        })
    } catch (err) {
        console.error("Failed to start application due to DB error:", err);
        process.exit(1); // Exit the application on failure
    }
};

startApp();