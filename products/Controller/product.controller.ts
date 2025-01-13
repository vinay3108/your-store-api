import { Request, Response, NextFunction } from "express";
import { Product } from "@root/Model/product.model";
import mysqlDataSource from "@root/db/db.connection";
import { AppError } from "@root/Middlewares/errorHandler.middleware";

const productRepository = mysqlDataSource.getRepository(Product);

// Create a new product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, brand, imageUrl, rating } = req.body;

    const product = new Product();
    product.name = name;
    product.type = type;
    product.brand = brand;
    product.imageUrl = imageUrl;
    product.rating = rating;

    try {
        const savedProduct = await productRepository.save(product);
        res.status(201).json({ product: savedProduct });
    } catch (error) {
        return next(new AppError("Error creating product", 500));
    }
};

// Get all products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productRepository.find();
        res.status(200).json({ products });
    } catch (error) {
        return next(new AppError("Error fetching products", 500));
    }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const product = await productRepository.findOne({ where: { id: Number(id) } });
        if (!product) {
            return next(new AppError("Product not found", 404));
        }
        res.status(200).json({ product });
    } catch (error) {
        return next(new AppError("Error fetching product", 500));
    }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, type, brand, imageUrl, rating } = req.body;

    try {
        const product = await productRepository.findOne({ where: { id: Number(id) } });
        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        product.name = name || product.name;
        product.type = type || product.type;
        product.brand = brand || product.brand;
        product.imageUrl = imageUrl || product.imageUrl;
        product.rating = rating || product.rating;

        const updatedProduct = await productRepository.save(product);
        res.status(200).json({ product: updatedProduct });
    } catch (error) {
        return next(new AppError("Error updating product", 500));
    }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const product = await productRepository.findOne({ where: { id: Number(id) } });
        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        await productRepository.remove(product);
        res.status(204).send(); // No content
    } catch (error) {
        return next(new AppError("Error deleting product", 500));
    }
};