import { NextFunction, Request, Response, Router } from 'express';
import {Comments} from '../models-mongo/Comment';
import {Comment as CommentType} from '../../../sharedTypes/comment.type'

export function createComment(req: Request, res: Response): void {
    const newCommentItem = new Comments(<CommentType>{
        body: req.body.body,
        createdBy: req.params.userId,
        question: req.params.questionId
    })

    newCommentItem.save().then(item => res.json(item))
}

export function upvoteComment(req: Request, res: Response): void {
    Comments.updateOne(
        {"_id": req.params.commentId},
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

export function deleteComment(req: Request, res: Response): void {
    Comments.findById(req.params.commentId)
    .then((item: any) => item.remove().then(() => res.json({success: true})))
}