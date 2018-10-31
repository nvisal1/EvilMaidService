import { DataStore } from "../../interfaces/datastore";
import { Router, Response } from "express";
import { BlogInteractor } from "../../interactors/blog_interactor";
import { UserInteractor } from "../../interactors/user_interactor";
// tslint:disable-next-line:no-require-imports
const version = require('../../../package.json').version;

export class ExpressAuthRouteDriver {

    constructor(private dataStore: DataStore) {}

    static buildRouter(
        dataStore: DataStore
    ): Router  {
        const authRouter = new ExpressAuthRouteDriver(dataStore);
        const router: Router = Router();
        authRouter.setBlogRoutes(router);
        authRouter.setUserRoutes(router);
        return router;
    }

    // Private Handler Methods
    private handleDefaultRoute(res: Response) {
        res.json({
            version,
            message: `Welcome to the EVIL MAID' API v${version}`,
        });
    }

    private handlePostBlog() {
        BlogInteractor.postBlog();
    }

    private handleEditBlog() {
        BlogInteractor.editBlog();
    }

    private handleDeleteBlog() {
        BlogInteractor.deleteBlog();
    }

    private handleLogout() {
        UserInteractor.logout();
    }

    public setBlogRoutes(router: Router): void {
        // Default Route
        router.get('/', async (req, res) => {this.handleDefaultRoute(res)});

        // Post New Blog
        router.route('/users/:username/blogs').post(async (req, res) => {this.handlePostBlog()})
            // Edit Blog
            .patch(async (req, res) => {this.handleEditBlog()})
            // Delete Blog
            .delete(async (req, res) => {this.handleDeleteBlog()});
    }

    public setUserRoutes(router: Router): void {
        // Logout
        router.delete('users/:username/tokens', async (req, res) => {this.handleLogout()});
    }
}