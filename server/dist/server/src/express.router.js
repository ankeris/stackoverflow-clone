"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var QuestionController = __importStar(require("./controller/question.controller"));
var CommentController = __importStar(require("./controller/comment.controller"));
var UserController = __importStar(require("./controller/user.controller"));
var user_controller_1 = require("./controller/user.controller");
var ExpressRouter = /** @class */ (function () {
    function ExpressRouter(app) {
        this.router = express_1.Router();
        this.app = app;
    }
    ExpressRouter.prototype.init = function () {
        // Get
        this.router.get("/questions", user_controller_1.ensureAuth, QuestionController.getAll);
        this.router.get("/questions/:id", user_controller_1.ensureAuth, QuestionController.getOne);
        this.router.get("/questions/:id/comments", user_controller_1.ensureAuth, CommentController.getAllForQuestion);
        this.router.get("/users/:id", user_controller_1.ensureAuth, UserController.getOne);
        // Post
        this.router.post("/questions/user/:userId", user_controller_1.ensureAuth, QuestionController.createQuestion);
        this.router.post("/questions/:questionId/user/:userId", user_controller_1.ensureAuth, CommentController.createComment);
        this.router.post("/users/", UserController.createUser); // No auth needed
        this.router.post("/users/login", UserController.login); // No auth needed
        // Update
        this.router.patch("/questions/upvote/:questionId/user/:userId", user_controller_1.ensureAuth, QuestionController.upvoteQuestion);
        this.router.patch("/questions/upvote/:commentId/user/:userId", user_controller_1.ensureAuth, CommentController.upvoteComment);
        // Delete
        this.router.delete("/questions/:questionId", user_controller_1.ensureAuth, QuestionController.deleteQuestion);
        this.router.delete("/questions/:questionId/comment/", user_controller_1.ensureAuth, CommentController.deleteComment);
        this.app.use("/api/", this.router);
    };
    return ExpressRouter;
}());
exports.default = ExpressRouter;
