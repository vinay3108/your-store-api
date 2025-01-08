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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_connection_1 = require("./db/db.connection");
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 5006;
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConnection = yield (0, db_connection_1.connectMySql)();
        console.log("Database connected:", dbConnection.isInitialized);
        app.get('/', (req, res) => {
            res.send("hello");
        });
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
    }
    catch (err) {
        console.error("Failed to start application due to DB error:", err);
        process.exit(1); // Exit the application on failure
    }
});
startApp();
//# sourceMappingURL=index.js.map