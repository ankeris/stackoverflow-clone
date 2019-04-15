import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
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
        ref: 'Users'
    },
    question: {
        type: ObjectId,
        ref: 'Questions'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Comments = mongoose.model('Comments', CommentSchema); 