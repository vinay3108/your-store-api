import { DataSource } from "typeorm";
import { Product } from "../Model/products.model";
import { Shop } from "../Model/shop.model";
import { Category } from "../Model/categories.model";
import { ShopProduct } from "../Model/shop_products.model";
import { ShopProductDiscount } from "../Model/shop_product_discounts.model";

export default new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: "Vinay@123",
    database:'finance_management',
    entities: [Product,Shop,Category,ShopProduct,ShopProductDiscount],
    migrations: ["./migrations/*.ts"],
    synchronize: true, 
    // logging: true,
})

