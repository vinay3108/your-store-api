import { DataSource } from "typeorm";
import { Brand } from "../Model/brand.model";
import { Category } from "../Model/categories.model";
import { Product } from "../Model/products.model";
import { ProductImages } from "../Model/product_images.model"; // Ensure this model exists
import { Shop } from "../Model/shop.model";
import { ShopProduct } from "../Model/shop_products.model";
import { faker } from "@faker-js/faker";

export const seedDatabase = async (dataSource: DataSource) => {
    await dataSource.initialize();
    console.log("Seeding started...");

    const brandRepo = dataSource.getRepository(Brand);
    const categoryRepo = dataSource.getRepository(Category);
    const productRepo = dataSource.getRepository(Product);
    const productImageRepo = dataSource.getRepository(ProductImages);
    const shopRepo = dataSource.getRepository(Shop);
    const shopProductRepo = dataSource.getRepository(ShopProduct);

    // Insert Brands
    const brands = [];
    for (let i = 0; i < 5; i++) {
        const brand = brandRepo.create({
            name: faker.company.name(),
            description: faker.company.catchPhrase(),
        });
        brands.push(await brandRepo.save(brand));
    }

    // Insert Categories
    const categories = [];
    for (let i = 0; i < 5; i++) {
        const category = categoryRepo.create({
            name: faker.commerce.department(),
        });
        categories.push(await categoryRepo.save(category));
    }

    // Insert Shops
    const shops = [];
    for (let i = 0; i < 3; i++) {
        const shop = shopRepo.create({
            name: faker.company.name(),
            owner_name: faker.person.fullName(),
        });
        shops.push(await shopRepo.save(shop));
    }

    // Insert Products
    const products = [];
    for (let i = 0; i < 10; i++) {
        const product = productRepo.create({
            name: faker.commerce.productName(),
            brand: brands[Math.floor(Math.random() * brands.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            description: faker.commerce.productDescription(),
            base_price: parseFloat(faker.commerce.price()),
        });
        products.push(await productRepo.save(product));
    }

    // Insert Product Images (Each product gets 2-3 images)
    for (const product of products) {
        const numImages = faker.number.int({ min: 2, max: 3 });

        for (let i = 0; i < numImages; i++) {
            await productImageRepo.save({
                product: product,
                image_url: faker.image.urlLoremFlickr({ category: "product" }), // Generates a random product image URL
                alt_text: `Image of ${product.name}`,
                display_order: i + 1,
            });
        }
    }

    // Insert Shop Products (Mapping products to shops)
    for (let i = 0; i < 15; i++) {
        await shopProductRepo.save({
            shop: shops[Math.floor(Math.random() * shops.length)],
            product: products[Math.floor(Math.random() * products.length)],
            price: parseFloat(faker.commerce.price()),
            stock: faker.number.int({ min: 1, max: 100 }),
        });
    }

    console.log("✅ Seeding completed!");
    await dataSource.destroy();
};
