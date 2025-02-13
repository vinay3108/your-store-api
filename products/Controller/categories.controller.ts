import { Request, Response } from "express";
import dbConnection from "@root/DB/db.connection";
import { Category } from "@root/Model/categories.model";

const categoryRepository = dbConnection.getRepository(Category);

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, parentCategoryId } = req.body;
        
        let parentCategory = null;
        if (parentCategoryId) {
            parentCategory = await categoryRepository.findOne({ where: { id: parentCategoryId } });
            if (!parentCategory) {
                return res.status(400).json({ message: "Invalid parent category ID" });
            }
        }

        const category = categoryRepository.create({ name, parentCategory });
        await categoryRepository.save(category);

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};

export const getCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await categoryRepository.find({
            relations: ["parentCategory", "subcategories", "products"],
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await categoryRepository.findOne({
            where: { id: Number(req.params.id) },
            relations: ["parentCategory", "subcategories", "products"],
        });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name, parentCategoryId } = req.body;
        let category = await categoryRepository.findOne({ where: { id: Number(req.params.id) } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        let parentCategory = null;
        if (parentCategoryId) {
            parentCategory = await categoryRepository.findOne({ where: { id: parentCategoryId } });
            if (!parentCategory) {
                return res.status(400).json({ message: "Invalid parent category ID" });
            }
        }

        category.name = name || category.name;
        category.parentCategory = parentCategory;
        await categoryRepository.save(category);

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryRepository.findOne({ where: { id: Number(req.params.id) } });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await categoryRepository.remove(category);
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
};
