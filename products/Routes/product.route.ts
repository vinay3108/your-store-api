import express, { Request, Response } from "express";
import {createProduct,updateProduct,deleteProduct, getProducts, createBulkProducts } from "@root/Controller/product.controller";
import { validateRequest } from "@root/Middlewares/validateRequest.middleware";
import {
    createProductValidation,
    updateProductValidation,
    deleteProductValidation,
    bulkCreateProductValidation,
} from "@root/Validation/product.validation";
import upload from "@root/Uploads";

export default function AccountRouter() {
    const router = express.Router();
    router.route('/').get(getProducts);
    router.route('/bulk/create').post(upload.single('bulk_file'),createBulkProducts);
    router
        .route("/create")
        .post(validateRequest(createProductValidation), createProduct);
    router
        .route("/update/:id")
        .post(validateRequest(updateProductValidation), updateProduct);
    router
    .route("/delete/:id")
    .post(validateRequest(deleteProductValidation), deleteProduct);

    return router;
}
