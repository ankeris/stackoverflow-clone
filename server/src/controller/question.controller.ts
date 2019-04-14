import { NextFunction, Request, Response, Router } from 'express';
import { Question } from '../models-mongo/Question';
import { Question as QuestionType } from '../types/question.type';

export function getAll(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Content-Type', 'application/json');
    const data = 'receiving all questions'
    // Function to get all questions
    res.send(data);
}

export function getOne(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Content-Type', 'application/json');
    const data = {};
    // Function to get all questions
    res.send(data);
}

export function createPost(req: Request, res: Response): void {
    const newItem = new Question(<QuestionType>{
        title: req.body.title,
        body: req.body.body,
        rating: req.body.rating,
        createdBy: req.body.createdBy,
        
    })
}