import { DataSource } from "typeorm";
import { Product } from "../Model/products.model";

export default new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: "Vinay@123",
    database:'finance_management',
    entities: [Product],
    migrations: ["./migrations/*.ts"],
    synchronize: true, 
    // logging: true,
})

