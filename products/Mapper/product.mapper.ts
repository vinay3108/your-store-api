// src/Product/mappers/product.mapper.ts

import { Product } from '@root/Model/products.model';
import { ProductResponse, CreateProductRequest } from '@root/DTO/product.dto';

export class ProductMapper {
    static toResponse(product: Product): ProductResponse {
        return {
            id: product.id,
            name: product.name,
            type: product.type,
            brand: product.brand,
            imageUrl: product.imageUrl,
            rating: product.rating,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    }

    static toResponseList(products: Product[]): ProductResponse[] {
        return products.map((product) => this.toResponse(product));
    }

    static toEntity(dto: CreateProductRequest): Product {
        const product = new Product();
        product.name = dto.name;
        product.type = dto.type;
        product.brand = dto.brand;
        product.imageUrl = dto.imageUrl;
        product.rating = dto.rating;
        return product;
    }
}