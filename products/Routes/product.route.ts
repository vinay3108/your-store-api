import express, { Request, Response } from "express";
import {ProductController} from "@root/Controller/product.controller";
import { validateRequest } from "@root/Middlewares/validateRequest.middleware";
import {
    createProductValidation,
    updateProductValidation,
    deleteProductValidation,
    bulkCreateProductValidation,
} from "@root/Validation/product.validation";
import upload from "@root/Uploads";

export default function ProductRouter() {
    const router = express.Router();
    router.post("/", ProductController.create);
    router.get("/", ProductController.getAll);
    router.get("/:id", ProductController.getById);
    router.put("/:id", ProductController.update);
    router.delete("/:id", ProductController.delete);
    router.get("/:id/detail", ProductController.getDetail);
    router.get("/brand/:brandId", ProductController.getProductByBrand);


    return router;
}
