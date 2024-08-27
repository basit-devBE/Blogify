import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    content:{
        type: String,
        required: true
    },
    User:{
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    Likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        text: String,
        date: { type: Date, default: Date.now }
    }]    
},
{timestamps: true}
)


const Blog = mongoose.model('Blog' ,BlogSchema)
export default Blog