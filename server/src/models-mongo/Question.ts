import mongoose from 'mongoose';
import { User } from './User';
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
    rating: {
        type: Number,
        required: false
    },
    createdBy: {
        type: ObjectId,
        ref: 'User' // Reference to some EventSchema
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: Array,
        required: false
    }
});

export const Question = mongoose.model('Questions', QuestionSchema); 