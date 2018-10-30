import { DataStore } from "../../interfaces/datastore";
import { Router } from "express";


export class ExpressPublicRouteDriver {

    constructor(
        private dataStore: DataStore,
    ) {}


    static buildRouter(
        dataStore: DataStore
    ): Router  {
        const e = new ExpressPublicRouteDriver(dataStore);
        const router: Router = Router();
        // e.setRoutes(router);
        return router;
    }
    
}