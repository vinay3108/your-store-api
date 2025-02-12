import { Request, Response } from "express";
import { ProductService } from "@root/Services/product.service";

const productService = new ProductService();

export class ProductController {
    static async create(req: Request, res: Response) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: "Error creating product", error });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const product = await productService.getProductById(Number(req.params.id));
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Error fetching product", error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const product = await productService.updateProduct(Number(req.params.id), req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Error updating product", error });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await productService.deleteProduct(Number(req.params.id));
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting product", error });
        }
    }
}
