import dataSource from "../DB/db.connection";
import { seedDatabase } from "./index.seeders";

seedDatabase(dataSource).catch((error) => console.log(error));
