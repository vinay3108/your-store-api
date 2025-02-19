import { DataSource } from "typeorm";
import { Brand } from "../Model/brand.model";
import { Category } from "../Model/categories.model";
import { Product } from "../Model/products.model";
import { ProductImages } from "../Model/product_images.model";
import { Shop } from "../Model/shop.model";
import { ShopProduct } from "../Model/shop_products.model";
import { ProductDetail } from "../Model/product_details.model";
import { ProductKeyFeature } from "../Model/product_key_features.model";
import { ProductIngredient } from "../Model/product_ingredients.model";
import { ProductReturnPolicy } from "../Model/product_return_policy.model";
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
    const productDetailRepo = dataSource.getRepository(ProductDetail);
    const productKeyFeatureRepo = dataSource.getRepository(ProductKeyFeature);
    const productIngredientRepo = dataSource.getRepository(ProductIngredient);
    const productReturnPolicyRepo = dataSource.getRepository(ProductReturnPolicy);

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

    // Insert Product Details
    const productDetails = [];
    for (const product of products) {
        const productDetail = productDetailRepo.create({
            product: product,
            type: faker.commerce.productMaterial(),
            unit: `${faker.number.int({ min: 100, max: 1000 })} ml`,
            fssai_license: faker.string.numeric(14),
            shelf_life: `${faker.number.int({ min: 3, max: 24 })} months`,
            manufacturer_name: faker.company.name(),
            manufacturer_address: faker.location.streetAddress(),
            country_of_origin: faker.location.country(),
            customer_care: faker.internet.email(),
            seller: faker.company.name(),
            seller_fssai: faker.string.numeric(14),
            description: faker.commerce.productDescription(),
            disclaimer: faker.lorem.sentence(),
        });
        productDetails.push(await productDetailRepo.save(productDetail));
    }

    // Insert Product Key Features
    for (const productDetail of productDetails) {
        const numFeatures = faker.number.int({ min: 2, max: 5 });
        for (let i = 0; i < numFeatures; i++) {
            await productKeyFeatureRepo.save({
                productDetail: productDetail,
                feature: faker.commerce.productAdjective(),
                display_order: i + 1,
            });
        }
    }

    // Insert Product Ingredients
    for (const productDetail of productDetails) {
        const numIngredients = faker.number.int({ min: 2, max: 5 });
        for (let i = 0; i < numIngredients; i++) {
            await productIngredientRepo.save({
                productDetail: productDetail,
                ingredient: faker.commerce.productMaterial(),
                display_order: i + 1,
            });
        }
    }

    // Insert Product Return Policy
    for (const productDetail of productDetails) {
        await productReturnPolicyRepo.save({
            productDetail: productDetail,
            policy: faker.lorem.sentence(),
            display_order: 1,
        });
    }

    // Insert Product Images (Each product gets 2-3 images)
    for (const product of products) {
        const numImages = faker.number.int({ min: 2, max: 3 });

        for (let i = 0; i < numImages; i++) {
            await productImageRepo.save({
                product: product,
                image_url: faker.image.urlLoremFlickr({ category: "product" }),
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
