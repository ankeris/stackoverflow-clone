"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ObjectId = Schema.Types.ObjectId;
var QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    upvotesCount: {
        type: Number,
        default: 0
    },
    upvotes: {
        type: [ObjectId],
        ref: 'Users'
    },
    createdBy: {
        type: ObjectId,
        ref: 'Users' // Reference to User schema
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
exports.Questions = mongoose_1.default.model('Questions', QuestionSchema);
