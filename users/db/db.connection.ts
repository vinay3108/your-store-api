import { DataSource } from "typeorm";
import { User } from "@root/Model/user.model";

export default new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: 'vinay',
    password: "Vinay@123",
    database:'finance_management',
    entities: [User],
    migrations: ["./migrations/*.ts"],
    synchronize: true, 
    // logging: true,
})

