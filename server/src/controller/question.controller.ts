import { NextFunction, Request, Response, Router } from 'express';
import { Question } from '../types/question.type';

export function getAll(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Content-Type', 'application/json');
    const data = {};
    // Function to get all questions
    res.send(data);
}

export function getOne(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Content-Type', 'application/json');
    const data = {};
    // Function to get all questions
    res.send(data);
}
