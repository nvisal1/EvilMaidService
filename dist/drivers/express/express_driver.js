"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var express_public_route_driver_1 = require("./express_public_route_driver");
var express_auth_route_driver_1 = require("./express_auth_route_driver");
var ExpressDriver = /** @class */ (function () {
    function ExpressDriver() {
    }
    ExpressDriver.start = function (dataStore) {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // Set our public api routes
        this.app.use('/', express_public_route_driver_1.ExpressPublicRouteDriver.buildRouter(dataStore));
        // Set Validation Middleware
        // this.app.use(enforceTokenAccess);
        // this.app.use((error: any, req: any, res: any, next: any) => {
        //     if (error.name === 'UnauthorizedError') {
        //         res.status(401).send('Invalid Access Token');
        //     }
        // });
        // Set our authenticated api routes
        this.app.use('/', express_auth_route_driver_1.ExpressAuthRouteDriver.buildRouter(dataStore));
        // Allow Proxy
        this.app.set('trust proxy', true);
        /**
         * Get port from environment and store in Express.
         */
        var port = process.env.PORT || '3002';
        this.app.set('port', port);
        /**
         * Create HTTP server.
         */
        var server = http.createServer(this.app);
        /**
         * Listen on provided port, on all network interfaces.
         */
        server.listen(port, function () {
            return console.log("Evil Maid Service running on localhost:" + port);
        });
        return this.app;
    };
    ExpressDriver.app = express();
    return ExpressDriver;
}());
exports.ExpressDriver = ExpressDriver;
