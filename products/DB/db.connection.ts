import { DataSource } from "typeorm";
import { Product } from "../Model/product.model";

export default new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: 'vinay',
    password: "Vinay@123",
    database:'finance_management',
    entities: [Product],
    migrations: ["./migrations/*.ts"],
    synchronize: true, 
    // logging: true,
})

