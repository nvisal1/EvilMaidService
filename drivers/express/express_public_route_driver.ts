import { DataStore } from "../../interfaces/datastore";
import { Router, Request, Response } from "express";
import { BlogInteractor } from "../../interactors/blog_interactor";
import { UserInteractor } from "../../interactors/user_interactor";
import { User } from "../../types/blog";

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
    private handleGetAllBlogs(req: Request, res: Response) {
        BlogInteractor.getAllBlogs(this.dataStore);
    }

    private handleGetUserBlogs(req: Request, res: Response) {
        const userId = req.params.userID;
        try {
            BlogInteractor.getUserBlogs(
                this.dataStore,
                userId
            );
        } catch (error) {
            console.error(error);
        }
    }

    private handleUserRegistration(req: Request, res: Response) {
        const newUser: User = req.body.user;
        try {
            UserInteractor.register(
                this.dataStore,
                newUser
            );
        } catch (error) {
            console.error(error);
        }
    }

    private handleUserLogin(req: Request, res: Response) {
        // This object holds username and password
        const loginCreds = req.body.user;
        try {
            UserInteractor.login(
                this.dataStore,
                loginCreds.username,
                loginCreds.password
            );
        } catch(error) {
            console.error(error);
        }
    }

    public setBlogRoutes(router: Router): void {
        // Get all blogs
        router.get('/blogs', async (req, res) => {this.handleGetAllBlogs(req, res)});

        // Get User blogs
        router.get('/users/:username/blogs', async (req, res) => {this.handleGetUserBlogs(req, res)});
    }

    public setUserRoutes(router: Router): void {
        // Register
        router.post('/users', async (req, res) => {this.handleUserRegistration(req, res)});

        // Login
        router.post('/users/tokens', async (req, res) => {this.handleUserLogin(req, res)});
    }    
}