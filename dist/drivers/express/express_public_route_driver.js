"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ExpressPublicRouteDriver = /** @class */ (function () {
    function ExpressPublicRouteDriver(dataStore) {
        this.dataStore = dataStore;
    }
    ExpressPublicRouteDriver.buildRouter = function (dataStore) {
        var e = new ExpressPublicRouteDriver(dataStore);
        var router = express_1.Router();
        // e.setRoutes(router);
        return router;
    };
    return ExpressPublicRouteDriver;
}());
exports.ExpressPublicRouteDriver = ExpressPublicRouteDriver;
