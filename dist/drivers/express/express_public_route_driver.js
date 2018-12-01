"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var blog_interactor_1 = require("../../interactors/blog_interactor");
var user_interactor_1 = require("../../interactors/user_interactor");
var ExpressPublicRouteDriver = /** @class */ (function () {
    function ExpressPublicRouteDriver(dataStore) {
        this.dataStore = dataStore;
    }
    ExpressPublicRouteDriver.buildRouter = function (dataStore) {
        var publicRouter = new ExpressPublicRouteDriver(dataStore);
        var router = express_1.Router();
        publicRouter.setBlogRoutes(router);
        publicRouter.setUserRoutes(router);
        return router;
    };
    // Private Handler Methods
    ExpressPublicRouteDriver.prototype.handleGetAllBlogs = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var blogs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, blog_interactor_1.BlogInteractor.getAllBlogs(this.dataStore)];
                    case 1:
                        blogs = _a.sent();
                        res.status(200).send(blogs);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        res.status(500).send(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpressPublicRouteDriver.prototype.handleGetUserBlogs = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, blogs, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.params.userID;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, blog_interactor_1.BlogInteractor.getUserBlogs(this.dataStore, userId)];
                    case 2:
                        blogs = _a.sent();
                        res.status(200).send(blogs);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        res.status(500).send(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * This route provides random content for the evil maid modal
     *
     */
    ExpressPublicRouteDriver.prototype.handleEvilMaidAttack = function (req, res) {
    };
    ExpressPublicRouteDriver.prototype.handleUserRegistration = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser;
            return __generator(this, function (_a) {
                newUser = req.body.user;
                try {
                    user_interactor_1.UserInteractor.register(this.dataStore, newUser);
                }
                catch (error) {
                    console.error(error);
                    res.send(500).send(error);
                }
                return [2 /*return*/];
            });
        });
    };
    ExpressPublicRouteDriver.prototype.handleUserLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var loginCreds;
            return __generator(this, function (_a) {
                loginCreds = req.body;
                try {
                    user_interactor_1.UserInteractor.login(this.dataStore, loginCreds);
                }
                catch (error) {
                    console.error(error);
                    res.status(500).send(error);
                }
                return [2 /*return*/];
            });
        });
    };
    ExpressPublicRouteDriver.prototype.setBlogRoutes = function (router) {
        var _this = this;
        // Get all blogs
        // Vulnerable Route! Because of optional query param
        router.get('/blogs', function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            this.handleGetAllBlogs(req, res);
            return [2 /*return*/];
        }); }); });
        // Get User blogs
        router.get('/users/:username/blogs', function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            this.handleGetUserBlogs(req, res);
            return [2 /*return*/];
        }); }); });
    };
    ExpressPublicRouteDriver.prototype.setUserRoutes = function (router) {
        var _this = this;
        // Register
        router.post('/users', function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            this.handleUserRegistration(req, res);
            return [2 /*return*/];
        }); }); });
        // Login
        router.post('/users/tokens', function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            this.handleUserLogin(req, res);
            return [2 /*return*/];
        }); }); });
    };
    ExpressPublicRouteDriver.prototype.setEVILMAIDRoute = function (router) {
        var _this = this;
        router.get('/evilmaid', function (req, res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            this.handleEvilMaidAttack(req, res);
            return [2 /*return*/];
        }); }); });
    };
    return ExpressPublicRouteDriver;
}());
exports.ExpressPublicRouteDriver = ExpressPublicRouteDriver;
