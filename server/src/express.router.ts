import { Express, NextFunction, Request, Response, Router } from 'express';
import * as QuestionController from './controller/question.controller';
import * as CommentController from './controller/comment.controller';
import * as UserController from './controller/user.controller';

export default class ExpressRouter {
  public router: Router;
  private app: Express;

  constructor(app: Express) {
    this.router = Router();
    this.app = app;
  }

  public init(): void {
    // Get
    this.router.get('/questions', QuestionController.getAll);
    this.router.get('/questions/:id', QuestionController.getOne);
    this.router.get('/user/:id', UserController.getOne);

    // Post
    this.router.post('/questions/user/:userId', QuestionController.createQuestion);
    this.router.post('/questions/:questionId/user/:userId', CommentController.createComment);
    this.router.post('/user/', UserController.createUser);

    // Update
    this.router.patch('/questions/upvote/:questionId/user/:userId', QuestionController.upvoteQuestion);
    this.router.patch('/questions/upvote/:commentId/user/:userId', CommentController.upvoteComment);

    // Delete
    this.router.delete('/questions/:questionId', QuestionController.deleteQuestion);
    this.router.delete('/questions/:questionId', CommentController.deleteComment);

    this.app.use('/api/', this.router);
  }
}
