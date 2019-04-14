import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    createdBy: {
        type: Object,
        required: true
    },
    questionId: {
        type: Array,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model('Comments', CommentSchema); 