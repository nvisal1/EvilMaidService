import { DataStore } from "./interfaces/datastore";
import { ExpressDriver } from "./drivers/express/express_driver";
import { MongoDriver } from "./drivers/mongo/mongo_driver";


// Create DataStore
const driver = new MongoDriver();
// Start Server
ExpressDriver.start(driver);

