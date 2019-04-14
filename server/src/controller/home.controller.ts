import { NextFunction, Request, Response, Router } from 'express';
var express = require('express');
var router = express.Router();

type HomeData = {
    questions: string;
}
export default (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json');
    let data = <HomeData>{};
    data.questions = req.params.id;
    res.send(data);
}
