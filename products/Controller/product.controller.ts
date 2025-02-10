import { Product } from "@root/Model/products.model";
import mysqlDataSource from "@root/DB/db.connection";
import { ExcelService } from '@root/Excel/excel.service';
import { Request, Response, NextFunction } from "express";
import { AppError } from "@root/Middlewares/errorHandler.middleware";

const productRepository = mysqlDataSource.getRepository(Product);

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

export const createBulkProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const { path } = req.file;
        console.log('Uploaded file path:', path);

        const productsData = await new ExcelService().readExcelFile(path);
        console.log('Parsed Excel Data:', productsData);

        if (!Array.isArray(productsData) || productsData.length === 0) {
            res.status(400).json({ error: 'No valid data found in the Excel file' });
            return;
        }

        const productRepository = mysqlDataSource.getRepository(Product);

        const transformedData = productsData.map(data => productRepository.create(data));

        const savedProducts = await productRepository.manager.transaction(
            async (transactionManager) => {
                return await transactionManager.save(transformedData);
            }
        );

        res.status(201).json({ message: 'Products uploaded successfully', products: savedProducts });
    } catch (error) {
        console.error('Error processing bulk upload:', error);
        next(error);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productRepository.find();
        res.status(200).json({ products });
    } catch (error) {
        return next(new AppError("Error fetching products", 500));
    }
};

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