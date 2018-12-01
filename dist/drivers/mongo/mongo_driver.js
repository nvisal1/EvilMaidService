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
var mongodb_1 = require("mongodb");
var MongoDriver = /** @class */ (function () {
    function MongoDriver(dburi) {
        this.connect(dburi);
    }
    MongoDriver.prototype.connect = function (dbURI) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, mongodb_1.MongoClient.connect(dbURI, { useNewUrlParser: true })];
                    case 1:
                        _a.mongoClient = _b.sent();
                        this.db = this.mongoClient.db();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        return [2 /*return*/, Promise.reject('Problem connecting to database at ' + dbURI + ':\n\t' + e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDriver.prototype.fetchSearchResults = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var blogsCursor, blogs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.collection('blogs').find({ query: query })];
                    case 1:
                        blogsCursor = _a.sent();
                        blogs = blogsCursor.toArray();
                        return [2 /*return*/, blogs];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDriver.prototype.createBlog = function (blog) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.collection('blogs').insert(blog)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDriver.prototype.editBlog = function (blogId, blog) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.collection('blogs').updateOne({ _id: blogId }, blog)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDriver.prototype.deleteBlog = function (blogId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.collection('blogs').deleteOne({ _id: blogId })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param query: Object - This is where our query will be injected!
     * THIS IS OUR VULNERABLE ROUTE!
     */
    MongoDriver.prototype.getBlogs = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var blogsCursor, blogs, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!query) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.db.collection('blogs').find(query)];
                    case 1:
                        // If the malicious query exists, inject it!
                        blogsCursor = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.db.collection('blogs').find()];
                    case 3:
                        // Fetch every blog from the blogs collection
                        blogsCursor = _a.sent();
                        _a.label = 4;
                    case 4:
                        blogs = blogsCursor.toArray();
                        return [2 /*return*/, blogs];
                    case 5:
                        error_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_5)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MongoDriver.prototype.getUserBlogs = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var blogsCursor, blogs, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.db.collection('blogs').find({ author: userId })];
                    case 1:
                        blogsCursor = _a.sent();
                        return [4 /*yield*/, blogsCursor.toArray()];
                    case 2:
                        blogs = _a.sent();
                        return [2 /*return*/, blogs];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_6)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDriver.prototype.getBlog = function (blogId) {
        return __awaiter(this, void 0, void 0, function () {
            var blogCursor, blogArray, blog, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.db.collection('blogs').find({ _id: blogId })];
                    case 1:
                        blogCursor = _a.sent();
                        return [4 /*yield*/, blogCursor.toArray()];
                    case 2:
                        blogArray = _a.sent();
                        blog = blogArray[0];
                        return [2 /*return*/, blog];
                    case 3:
                        error_7 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_7)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDriver.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.collection('users').insert(user)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_8)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDriver.prototype.findUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(user);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.collection('users').find({
                                username: user['username'],
                                password: user['password']
                            }).toArray()];
                    case 2:
                        result = _a.sent();
                        if (result.length > 0) {
                            return [2 /*return*/, result[0]];
                        }
                        return [2 /*return*/, false];
                    case 3:
                        error_9 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_9)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MongoDriver;
}());
exports.MongoDriver = MongoDriver;
