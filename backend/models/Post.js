import { Schema, model, Types } from 'mongoose'

const commentSchema = new Schema({
    avatar: {
        type :String,
        required: true
    },
    username: {
        type :String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const postSchema = new Schema({
    place: {
        imageUrl: {
            type: String,
            required: true,
            validate: /https?:\/\/.+/
        },
        location: {
            type: String,
            required: true,
            minLength: 3
        },
        region: {
            type: String,
            required: true,
            minLength: 6
        }
    },
    description: {
        type: String,
        required: true,
        minLength: 20
    },
    comments: [commentSchema],
    likes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: {
            _id: { type: Types.ObjectId, ref: 'User'},
            avatar: { type: String },
            username: { type: String },
        } 
    }
},
    { timestamps: true });

export const Post = model('Post', postSchema);