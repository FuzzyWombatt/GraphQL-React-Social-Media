const {
    SchemaTypes: SchemaTypes,
    Schema: Schema,
    model: model,
} = require('mongoose');

const CommentSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    },
    post: {
        type: SchemaTypes.ObjectId,
        ref: 'post',
    },
    creator: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Array,
        default: [],
    },
    downvotes: {
        type: Array,
        default: [],
    },
    totalvote: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    dateEdited: {
        type: Date,
        default: null,
    },
});

const Comment = model('comment', CommentSchema);

module.exports = Comment;
