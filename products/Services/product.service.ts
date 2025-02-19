import { Product } from "@root/Model/products.model";
import dbConnection from "@root/DB/db.connection";

export class ProductService {
    private productRepository = dbConnection.getRepository(Product);

    async createProduct(data: Partial<Product>) {
        const product = this.productRepository.create(data);
        return await this.productRepository.save(product);
    }

    async getAllProducts() {
        return await this.productRepository.find({
            relations: ["brand", "category", "shopProducts"],
        });
    }

    async getProductById(id: number) {
        return await this.productRepository.findOne({
            where: { id },
            relations: ["brand", "category", "shopProducts"],
        });
    }

    async updateProduct(id: number, data: Partial<Product>) {
        await this.productRepository.update(id, data);
        return await this.getProductById(id);
    }

    async deleteProduct(id: number) {
        return await this.productRepository.delete(id);
    }
    async getProductByBrandId(id: number) {
        return await this.productRepository.find({
            where: { brand: { id } },
            relations: ["brand"],
            take: 10,
        });
    }
    async getProductDetail(id:number){
        return await this.productRepository.find({
            where : {id},
            relations:["details","images"]
        })
    }
}
