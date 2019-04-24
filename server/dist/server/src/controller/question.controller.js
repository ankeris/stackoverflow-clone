"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Question_1 = require("../models-mongo/Question");
// import { ObjectID } from "mongodb";
function getAll(req, res) {
    res.setHeader("Content-Type", "application/json");
    Question_1.Questions.find({})
        .populate("createdBy")
        .exec(function (err, questions) {
        if (err)
            throw err;
        res.send(questions);
    });
}
exports.getAll = getAll;
function getOne(req, res) {
    res.setHeader("Content-Type", "application/json");
    // Function to get all questions
    Question_1.Questions.findOne({
        _id: req.params.id
    })
        .populate("createdBy")
        .exec(function (err, result) {
        if (err)
            throw err;
        res.send(result);
    });
}
exports.getOne = getOne;
function createQuestion(req, res) {
    var newItem = new Question_1.Questions({
        title: req.body.title,
        body: req.body.body,
        createdBy: req.params.userId
    });
    newItem.save().then(function (item) { return res.json(item); });
}
exports.createQuestion = createQuestion;
function upvoteQuestion(req, res) {
    Question_1.Questions.updateOne({
        _id: req.params.questionId,
        upvotes: { $ne: req.params.userId }
    }, {
        $inc: { upvotesCount: 1 },
        $push: { upvotes: req.params.userId }
    })
        .lean()
        .then(function (e) { return res.send(e); });
}
exports.upvoteQuestion = upvoteQuestion;
function deleteQuestion(req, res) {
    Question_1.Questions.findById(req.params.questionId).then(function (item) { return item.remove().then(function () { return res.json({ success: true }); }); });
}
exports.deleteQuestion = deleteQuestion;
