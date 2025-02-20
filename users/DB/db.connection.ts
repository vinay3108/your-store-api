import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "../Model/users.model";
export default new DataSource({
    type: process.env.DB_TYPE as "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    migrations: ["./migrations/*.ts"],
    synchronize: process.env.SYNCHRONIZE === "true",
    logging: process.env.LOGGING === "true",
});
