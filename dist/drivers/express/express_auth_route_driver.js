"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var blog_interactor_1 = require("../../interactors/blog_interactor");
var user_interactor_1 = require("../../interactors/user_interactor");
// tslint:disable-next-line:no-require-imports
var version = require('../../../package.json').version;
var ExpressAuthRouteDriver = /** @class */ (function () {
    function ExpressAuthRouteDriver(dataStore) {
        this.dataStore = dataStore;
    }
    ExpressAuthRouteDriver.buildRouter = function (dataStore) {
        var authRouter = new ExpressAuthRouteDriver(dataStore);
        var router = express_1.Router();
        authRouter.setBlogRoutes(router);
        authRouter.setUserRoutes(router);
        return router;
    };
    ExpressAuthRouteDriver.prototype.handlePostBlog = function (res, req) {
        var blog = req.body.blog;
        try {
            blog_interactor_1.BlogInteractor.postBlog(this.dataStore, blog);
            res.sendStatus(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };
    ExpressAuthRouteDriver.prototype.handleEditBlog = function (res, req) {
        var editBlog = req.body.blog;
        var blogId = req.params.blogID;
        try {
            blog_interactor_1.BlogInteractor.editBlog(this.dataStore, editBlog);
            res.sendStatus(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };
    ExpressAuthRouteDriver.prototype.handleDeleteBlog = function (res, req) {
        var blogId = req.params.blogID;
        try {
            blog_interactor_1.BlogInteractor.deleteBlog(this.dataStore, blogId);
            res.sendStatus(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };
    ExpressAuthRouteDriver.prototype.handleLogout = function (res, req) {
        try {
            user_interactor_1.UserInteractor.logout();
        }
        catch (error) {
        }
    };
    ExpressAuthRouteDriver.prototype.setBlogRoutes = function (router) {
    };
    ExpressAuthRouteDriver.prototype.setUserRoutes = function (router) {
    };
    return ExpressAuthRouteDriver;
}());
exports.ExpressAuthRouteDriver = ExpressAuthRouteDriver;
