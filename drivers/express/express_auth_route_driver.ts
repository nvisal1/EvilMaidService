import { DataStore } from "../../interfaces/datastore";
import { Router, Response, Request } from "express";
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

    private handlePostBlog(res: Response, req: Request) {
        const blog = req.body.blog;
        try {
            BlogInteractor.postBlog(
                this.dataStore,
                blog
            );
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }   
    }

    private handleEditBlog(res: Response, req: Request) {
        const editBlog = req.body.blog;
        const blogId = req.params.blogID;
        try {
            BlogInteractor.editBlog(
                this.dataStore,
                editBlog
            );
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    private handleDeleteBlog(res: Response, req: Request) {
        const blogId = req.params.blogID;
        try {
            BlogInteractor.deleteBlog(
                this.dataStore,
                blogId
            );
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    private handleLogout(res: Response, req: Request) {
        try {
            UserInteractor.logout();
        } catch (error) {

        }
    }

    public setBlogRoutes(router: Router): void {
    }

    public setUserRoutes(router: Router): void {
    }
}