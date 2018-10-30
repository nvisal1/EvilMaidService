import * as express from 'express';
import { DataStore } from '../../interfaces/datastore';
import * as http from 'http';
import { ExpressPublicRouteDriver } from './express_public_route_driver';
import { ExpressAuthRouteDriver } from './express_auth_route_driver';
import { enforceTokenAccess } from '../../middleware/jwt.config';

export class ExpressDriver {

    static app = express();

    static start(dataStore: DataStore) {

        // Set our public api routes
        this.app.use(
            '/',
            ExpressPublicRouteDriver.buildRouter(dataStore)
        );

        // Set Validation Middleware
        this.app.use(enforceTokenAccess);
        this.app.use((error: any, req: any, res: any, next: any) => {
            if (error.name === 'UnauthorizedError') {
                res.status(401).send('Invalid Access Token');
            }
        });

        // Set our authenticated api routes
        this.app.use(
            '/',
            ExpressAuthRouteDriver.buildRouter(dataStore),
        );

        // Allow Proxy
        this.app.set('trust proxy', true);

        /**
         * Get port from environment and store in Express.
         */
        const port = process.env.PORT || '3000';
        this.app.set('port', port);

        /**
         * Create HTTP server.
         */
        const server = http.createServer(this.app);

        /**
         * Listen on provided port, on all network interfaces.
         */
        server.listen(port, () =>
            console.log(`Evil Maid Service running on localhost:${port}`),
        );

        return this.app;
    }
}