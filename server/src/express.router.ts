import { Express, Router } from "express";
import * as QuestionController from "./controller/question.controller";
import * as CommentController from "./controller/comment.controller";
import * as UserController from "./controller/user.controller";
import { ensureAuth } from "./controller/user.controller";

export default class ExpressRouter {
    public router: Router;
    private app: Express;

    constructor(app: Express) {
        this.router = Router();
        this.app = app;
    }

    public init(): void {
        // Get
        this.router.get("/questions", ensureAuth, QuestionController.getAll);
        this.router.get("/questions/:id", ensureAuth, QuestionController.getOne);
        this.router.get("/questions/:id/comments", ensureAuth, CommentController.getAllForQuestion);
        this.router.get("/users/:id", ensureAuth, UserController.getOne);

        // Post
        this.router.post("/questions/user/:userId", ensureAuth, QuestionController.createQuestion);
        this.router.post("/questions/:questionId/user/:userId", ensureAuth, CommentController.createComment);
        this.router.post("/users/", UserController.createUser); // No auth needed
        this.router.post("/users/login", UserController.login); // No auth needed

        // Update
        this.router.patch("/questions/upvote/:questionId/user/:userId", ensureAuth, QuestionController.upvoteQuestion);
        this.router.patch("/questions/upvote/:commentId/user/:userId", ensureAuth, CommentController.upvoteComment);

        // Delete
        this.router.delete("/questions/:questionId", ensureAuth, QuestionController.deleteQuestion);
        this.router.delete("/questions/:questionId/comment/", ensureAuth, CommentController.deleteComment);

        this.app.use("/api/", this.router);
    }
}
