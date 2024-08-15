import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    User:{
        type: Schema.Types.ObjectId,
        ref : 'User'   
    },
    Likes:[],
    comments:[]
},
{timestamps: true}
)
