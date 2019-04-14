import { Express, NextFunction, Request, Response, Router } from 'express';
import HomeController from './controller/home.controller';
import * as QuestionContoller from './controller/question.controller';
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
    this.router.get('/questions', QuestionContoller.getAll);
    this.router.get('/questions/:id', QuestionContoller.getOne);
    this.router.get('/user/:id', UserController.getOne);
    // Post
    this.router.post('/user/', UserController.createUser);
    this.app.use('/api/', this.router);
  }
}
