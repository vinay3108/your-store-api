import "dotenv/config";
import { DataSource } from "typeorm";
import { Product } from "../Model/products.model";
import { Shop } from "../Model/shop.model";
import { Brand } from "../Model/brand.model";
import { Category } from "../Model/categories.model";
import { ShopProduct } from "../Model/shop_products.model";
import { ShopProductDiscount } from "../Model/shop_product_discounts.model";
import { ProductImages } from "../Model/product_images.model";
import { ProductDetail } from "../Model/product_details.model";
import { ProductIngredient } from "../Model/product_ingredients.model";
import { ProductKeyFeature } from "../Model/product_key_features.model";
import { ProductReturnPolicy } from "../Model/product_return_policy.model";

export default new DataSource({
    type: process.env.DB_TYPE as "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Product,
        Shop,
        Category,
        Brand,
        ShopProduct,
        ShopProductDiscount,
        ProductImages,
        ProductDetail,
        ProductIngredient,
        ProductKeyFeature,
        ProductReturnPolicy,
    ],
    migrations: ["./migrations/*.ts"],
    synchronize: process.env.SYNCHRONIZE === "true",
    logging: process.env.LOGGING === "true",
});
