"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ExpressAuthRouteDriver = /** @class */ (function () {
    function ExpressAuthRouteDriver(dataStore) {
        this.dataStore = dataStore;
    }
    ExpressAuthRouteDriver.buildRouter = function (dataStore) {
        var e = new ExpressAuthRouteDriver(dataStore);
        var router = express_1.Router();
        // e.setRoutes(router);
        return router;
    };
    return ExpressAuthRouteDriver;
}());
exports.ExpressAuthRouteDriver = ExpressAuthRouteDriver;
