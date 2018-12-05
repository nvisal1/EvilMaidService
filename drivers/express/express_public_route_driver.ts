import { DataStore } from "../../interfaces/datastore";
import { Router, Request, Response } from "express";
import { BlogInteractor } from "../../interactors/blog_interactor";
import { UserInteractor } from "../../interactors/user_interactor";
import { User } from "../../types/blog";
// tslint:disable-next-line:no-require-imports
const version = require('../../../package.json').version;

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
      private handleDefaultRoute(res: Response) {
        res.json({
            version,
            message: `Welcome to the EVIL MAID API v${version}`,
        });
    }


    // Private Handler Methods
    private async handleGetAllBlogs(req: Request, res: Response) {
        try {
            const blogs = await BlogInteractor.getAllBlogs(this.dataStore);
            res.status(200).send(blogs);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    private async handleGetUserBlogs(req: Request, res: Response) {
        const userId = req.params.userID;
        try {
            const blogs = await BlogInteractor.getUserBlogs(
                this.dataStore,
                userId
            );
            res.status(200).send(blogs);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    /**
     * 
     * This route provides random content for the evil maid modal
     * 
     */
    private handleEvilMaidAttack(req: Request, res: Response) {
        
    }

    private async handleUserRegistration(req: Request, res: Response) {
        const newUser: User = req.body.user;
        try {
            UserInteractor.register(
                this.dataStore,
                newUser
            );
        } catch (error) {
            console.error(error);
            res.send(500).send(error);
        }
    }

    private async handleUserLogin(req: Request, res: Response) {
        // This object holds username and password
        const loginCreds = req.body;
        try {
            console.log(loginCreds);
            const user = await UserInteractor.login(
                this.dataStore,
                loginCreds
            );

            if (user === false) {
                res.status(400).send('Invalid Username or Password');
            } else {
                res.status(200).send(user);
            }

        } catch(error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    public setBlogRoutes(router: Router): void {
        // Default Route
        router.get('/', async (req, res) => {this.handleDefaultRoute(res)});
    }

    public setUserRoutes(router: Router): void {
        // Login
        router.post('/users/tokens', async (req, res) => {this.handleUserLogin(req, res)});
    }    

    public setEVILMAIDRoute(router: Router): void {
    }
}