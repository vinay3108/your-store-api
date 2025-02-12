import { Request, Response } from "express";
import dbConnection from "@root/DB/db.connection";
import { Brand } from "@root/Model/brand.model";

const brandRepository = dbConnection.getRepository(Brand);

export const createBrand = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const brand = brandRepository.create({ name, description });
        await brandRepository.save(brand);
        res.status(201).json(brand);
    } catch (error) {
        res.status(500).json({ message: "Error creating brand", error });
    }
};

export const getBrands = async (_req: Request, res: Response) => {
    try {
        const brands = await brandRepository.find({ relations: ["products"] });
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: "Error fetching brands", error });
    }
};

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const brand = await brandRepository.findOne({
            where: { id: Number(req.params.id) },
            relations: ["products"],
        });

        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: "Error fetching brand", error });
    }
};

export const updateBrand = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        let brand = await brandRepository.findOne({ where: { id: Number(req.params.id) } });

        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        brand.name = name || brand.name;
        brand.description = description || brand.description;
        await brandRepository.save(brand);
        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: "Error updating brand", error });
    }
};

export const deleteBrand = async (req: Request, res: Response) => {
    try {
        const brand = await brandRepository.findOne({ where: { id: Number(req.params.id) } });

        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }

        await brandRepository.remove(brand);
        res.json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting brand", error });
    }
};
