const {SchemaTypes: SchemaTypes, Schema: Schema, model: model} = require('mongoose')

const PostSchema = new Schema({
    user:{
        type: SchemaTypes.ObjectId,
        ref: 'user'
    },
    creator:{
        type: String,
        required: true
    },   
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    upvotes: {
        type: Array,
        default: []
    },
    downvotes: {
        type: Array,
        default: []
    },
    totalVote: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    dateEdited: {
        type: Date,
        default: null
    }
})

const Post = model('post', PostSchema);

module.exports = Post;