"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_driver_1 = require("./drivers/express/express_driver");
var mongo_driver_1 = require("./drivers/mongo/mongo_driver");
var dotenv = require("dotenv");
dotenv.config();
// Create DataStore
var driver = new mongo_driver_1.MongoDriver(process.env.DB_URI);
// Start Server
express_driver_1.ExpressDriver.start(driver);
