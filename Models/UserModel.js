//user model

import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    bio:{
        type: String,
        required: false
    },
    role:{
        type: String,
        required: true,
        enum:['user', 'author', 'admin'],
        default: 'user'
    }
})
//TODO: Add profile pictures and connect to cloudinary

const User = mongoose.model('User', UserSchema);
export default User; //export the model