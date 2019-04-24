"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comment_1 = require("../models-mongo/Comment");
function createComment(req, res) {
    var newCommentItem = new Comment_1.Comments({
        body: req.body.body,
        createdBy: req.params.userId,
        question: req.params.questionId
    });
    newCommentItem.save().then(function (item) { return res.json(item); });
}
exports.createComment = createComment;
function upvoteComment(req, res) {
    Comment_1.Comments.updateOne({ "_id": req.params.commentId }, {
        $inc: {
            "upvotesCount": +1
        },
        $addToSet: {
            "upvotes": req.params.userId
        }
    })
        .then(function (obj) { return res.json(obj); })
        .catch(function (err) { return console.log(err); });
}
exports.upvoteComment = upvoteComment;
function getAllForQuestion(req, res) {
    Comment_1.Comments.find({ question: req.params.id }).populate('createdBy').exec(function (err, comments) {
        if (err)
            throw err;
        res.send(comments);
    });
}
exports.getAllForQuestion = getAllForQuestion;
function deleteComment(req, res) {
    Comment_1.Comments.findById(req.params.commentId)
        .then(function (item) { return item.remove().then(function () { return res.json({ success: true }); }); });
}
exports.deleteComment = deleteComment;
