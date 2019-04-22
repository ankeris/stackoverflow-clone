import { NextFunction, Request, Response, Router } from "express";
import { Questions } from "../models-mongo/Question";
import { Question as QuestionType } from "../../../sharedTypes/question.type";
// import { ObjectID } from "mongodb";
export function getAll(req: Request, res: Response): void {
    res.setHeader("Content-Type", "application/json");
    Questions.find({})
        .populate("createdBy")
        .exec((err: any, questions: Array<QuestionType>) => {
            if (err) throw err;
            res.send(questions);
        });
}

export function getOne(req: Request, res: Response): void {
    res.setHeader("Content-Type", "application/json");
    // Function to get all questions
    Questions.findOne({
        _id: req.params.id
    })
        .populate("createdBy")
        .exec((err, result) => {
            if (err) throw err;
            res.send(result);
        });
}

export function createQuestion(req: Request, res: Response): void {
    const newItem = new Questions(<QuestionType>{
        title: req.body.title,
        body: req.body.body,
        createdBy: req.params.userId
    });
    newItem.save().then(item => res.json(item));
}

export function upvoteQuestion(req: Request, res: Response): void {
    Questions.updateOne(
        {
            _id: req.params.questionId,
            upvotes: { $ne: req.params.userId }
        },
        {
            $inc: { upvotesCount: 1 },
            $push: { upvotes: req.params.userId }
        }
    )
        .lean()
        .then(e => res.send(e));
}

export function deleteQuestion(req: Request, res: Response): void {
    Questions.findById(req.params.questionId).then((item: any) => item.remove().then(() => res.json({ success: true })));
}
