import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models-mongo/User';
import { User as UserType } from '../types/user.type';

export function getOne(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Content-Type', 'application/json');
    const data = {};
    // Function to get all questions
    res.send(data);
}

export function createUser(req: Request, res: Response): void {
    const newItem = new User(<UserType>{
        name: req.body.name,
        points: req.body.points,
    })
    newItem.save().then(item => res.json(item))
}