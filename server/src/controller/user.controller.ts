import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models-mongo/User';
import { User as UserType } from '../../../sharedTypes/user.type';

export function getOne(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Content-Type', 'application/json');
    User.findOne({
        "_id": req.params.id
    })
    .then(result => {
        if(result) {
        res.send(result);
        } else {
        res.json("No document matches the provided query.")
        }
        return result
    })
  .catch(err => console.error(`Failed to find document: ${err}`))
}

export function createUser(req: Request, res: Response): void {
    const newItem = new User(<UserType>{
        name: req.body.name,
        points: req.body.points,
    })
    newItem.save().then(item => res.json(item))
}