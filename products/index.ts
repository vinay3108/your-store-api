import express from "express";
import cors from 'cors';
require("module-alias/register");
import { Request, Response } from "express";
import ProductRouter from "@root/Routes/product.route";
import ProductDetailsRouter from "@root/Routes/product-details.route";
import dbConnection from "./DB/db.connection";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 5007;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const startApp = async () => {
    try {
        const db = await dbConnection.initialize();
        console.log("DATABASE connected:", db.isInitialized);
        app.get("/", (req: Request, res: Response) => {
            res.send("hello from Products");
        });
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
        app.use("/products", ProductRouter());
        app.use("/product-details", ProductDetailsRouter());
    } catch (err) {
        console.error("Failed to start application due to DB error:", err);
        process.exit(1); // Exit the application on failure
    }
};

startApp();
