import { DataStore } from "./interfaces/datastore";
import { ExpressDriver } from "./drivers/express/express_driver";
import { MongoDriver } from "./drivers/mongo/mongo_driver";
import * as dotenv from "dotenv";
dotenv.config();

// Create DataStore
const driver = new MongoDriver(process.env.DB_URI);
// Start Server
ExpressDriver.start(driver);

