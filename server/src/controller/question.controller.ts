import { NextFunction, Request, Response, Router } from 'express';
import { Questions } from '../models-mongo/Question';
import { Question as QuestionType } from '../../../sharedTypes/question.type';
var ObjectID = require('mongodb').ObjectID;

export function getAll(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Content-Type', 'application/json');
    Questions.find({}).populate('createdBy').exec((err: any, questions: Array<QuestionType>) => {
        if (err) throw err;
        res.send(questions);
    })
}

export function getOne(req: Request, res: Response, next: NextFunction): void {
    res.setHeader('Content-Type', 'application/json');
    // Function to get all questions
    Questions.findOne({
        "_id": ObjectID(req.params.id)
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

export function createQuestion(req: Request, res: Response): void {
    const newItem = new Questions(<QuestionType>{
        title: req.body.title,
        body: req.body.body,
        createdBy: req.params.userId
    })
    newItem.save().then(item => res.json(item))
}

export function upvoteQuestion(req: Request, res: Response): void {
    Questions.updateOne(
        {"_id": ObjectID(req.params.questionId)},
        {
            $inc: {
                "upvotesCount": +1
            },
            $addToSet: {
                "upvotes": req.params.userId
            }
        })
        .then((obj) => res.json(obj))
        .catch(err => console.log(err))
}

export function deleteQuestion(req: Request, res: Response): void {
    Questions.findById(req.params.questionId)
    .then((item: any) => item.remove().then(() => res.json({success: true})))
}