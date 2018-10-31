import { DataStore } from "../../interfaces/datastore";
import { Router } from "express";
import { BlogInteractor } from "../../interactors/blog_interactor";
import { UserInteractor } from "../../interactors/user_interactor";


export class ExpressPublicRouteDriver {

    constructor(
        private dataStore: DataStore,
    ) {}


    static buildRouter(
        dataStore: DataStore
    ): Router  {
        const publicRouter = new ExpressPublicRouteDriver(dataStore);
        const router: Router = Router();
        publicRouter.setBlogRoutes(router);
        publicRouter.setUserRoutes(router);
        return router;
    }

    // Private Handler Methods
    private handleGetAllBlogs() {
        BlogInteractor.getAllBlogs();
    }

    private handleGetUserBlogs() {
        BlogInteractor.getUserBlogs();
    }

    private handleUserRegistration() {
        UserInteractor.register();
    }

    private handleUserLogin() {
        UserInteractor.login();
    }

    public setBlogRoutes(router: Router): void {
        // Get all blogs
        router.get('/blogs', async (req, res) => {this.handleGetAllBlogs()});

        // Get User blogs
        router.get('/users/:username/blogs', async (req, res) => {this.handleGetUserBlogs()});
    }

    public setUserRoutes(router: Router): void {
        // Register
        router.post('/users', async (req, res) => {this.handleUserRegistration()});

        // Login
        router.post('/users/tokens', async (req, res) => {this.handleUserLogin()});
    }    
}