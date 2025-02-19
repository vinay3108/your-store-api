import express, { Request, Response } from "express";
import { validateRequest } from "@root/Middlewares/validateRequest.middleware";
import { ProductDetailController } from "@root/Controller/product-details.controller";
import {
    createProductValidation,
    updateProductValidation,
    deleteProductValidation,
    bulkCreateProductValidation,
} from "@root/Validation/product.validation";
import upload from "@root/Uploads";

export default function ProductRouter() {
    const router = express.Router();
    router.post("/", ProductDetailController.create);
    router.get("/", ProductDetailController.getAll);
    router.get("/:id", ProductDetailController.getOne);
    router.put("/:id", ProductDetailController.update);
    router.delete("/:id", ProductDetailController.delete);
    router.get("/product/:productId", ProductDetailController.getDetailsByProductId);
    

    return router;
}
