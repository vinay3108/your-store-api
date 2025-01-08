"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMySql = void 0;
const typeorm_1 = require("typeorm");
const MySqlDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || "3306", 10),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
const connectMySql = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataSource = yield MySqlDataSource.initialize();
        console.log("Data Source has been initialized!");
        return dataSource; // Return the connected instance
    }
    catch (err) {
        console.error("Error during Data Source initialization", err);
        throw err; // Rethrow the error to ensure the caller is aware of the failure
    }
});
exports.connectMySql = connectMySql;
//# sourceMappingURL=db.connection.js.map