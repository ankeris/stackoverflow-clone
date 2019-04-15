import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId


const QuestionSchema = new Schema({
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
    comments: [{
        type: ObjectId,
        ref: 'Comments',
    }]
});

export const Questions = mongoose.model('Questions', QuestionSchema); 