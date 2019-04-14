import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://www.wittenberg.edu/sites/default/files/2017-11/nouser_0.jpg'
    },
    points: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model('Users', UserSchema); 