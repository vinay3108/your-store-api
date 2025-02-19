import { Request, Response } from "express";
import dbSource from "@root/DB/db.connection";
import { ProductDetail } from "@root/Model/product_details.model";
import { Product } from "@root/Model/products.model";

const productDetailRepo = dbSource.getRepository(ProductDetail);
const productRepo = dbSource.getRepository(Product);

export class ProductDetailController {
    static async getAll(req: Request, res: Response) {
        try {
            const details = await productDetailRepo.find({ relations: ["product"] });
            res.json(details);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getOne(req: Request, res: Response) {
        try {
            const detail = await productDetailRepo.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ["product"],
            });

            if (!detail){
                res.status(404).json({ message: "Product Detail not found" });
                return;
            }

            res.json(detail);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getDetailsByProductId(req: Request, res: Response) {
        try {
            console.log(req.params);
            const detail = await productDetailRepo.find({
                where: { id: parseInt(req.params.productId) },
                relations: ["product"],
                take:10
            });

            if (!detail){
                res.status(404).json({ message: "Product Detail not found" });
                return;
            }

            res.json(detail);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async create(req: Request, res: Response) {
        try {
            const { productId, type, unit, fssai_license, shelf_life, manufacturer_name } = req.body;

            const product = await productRepo.findOneBy({ id: productId });
            if (!product){
                res.status(404).json({ message: "Product not found" })
                return;
            };

            const newDetail = productDetailRepo.create({
                product,
                type,
                unit,
                fssai_license,
                shelf_life,
                manufacturer_name,
            });

            const savedDetail = await productDetailRepo.save(newDetail);
            res.status(201).json(savedDetail);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const detail = await productDetailRepo.findOneBy({ id });

            if (!detail){
                res.status(404).json({ message: "Product Detail not found" });
                return;
            } 

            Object.assign(detail, req.body);
            await productDetailRepo.save(detail);

            res.json(detail);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await productDetailRepo.delete(id);

            if (result.affected === 0){
                res.status(404).json({ message: "Product Detail not found" });
                return ;
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
