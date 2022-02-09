const { AuthenticationError } = require('apollo-server-express');
const { post } = require('superagent');
const auth = require('../../middleware/auth');

const Comment = require('../../models/Comment');
const Post = require('../../models/Post')
const User = require('../../models/User')

module.exports = {
    Query: {
        //Possible switch to Post resolver and rename getPostComments
        async getComments(_,{postId}) {
            try {
                const comments = await Comment.find({post: postId}).sort({date: -1});
                if(!comments){
                    return 'No comments exists'
                }else{
                    return comments;
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async createComment(_, { body, postId }, context) {
            let user = auth(context);

            let post = await Post.findById(postId)
            user = await User.findById(user.id)

            if (!body) {
                throw new Error('Comment body must not be empty');
            }else if(!post){
                throw new Error('Post cannot be found')
            }

            const newComment = new Comment({
                body,
                user: user.id,
                creator: user.name,
                post: postId,
            });

            const comment = await newComment.save();

            post = await Post.findByIdAndUpdate(postId, {$inc: {commentCount: 1}})

            return comment;
        },
        async deleteComment(_, { commentId }, context) {
            const user = auth(context);

            try {
                let comment = await Comment.findById(commentId);    

                if (user.id === comment.user.toString()) {
                    await Comment.findByIdAndDelete(commentId);

                    return 'Comment deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async editComment(_, { commentId, body }, context) {
            const user = auth(context);

            let update = {}
            
            if (!body) {
                throw new Error('Comment body must not be empty');
            }else{
                update.body = body
                update.dateEdited = Date.now();
            }

            try {
                let comment = await Comment.findById(commentId);

                if (user.id === comment.user) {
                    await Comment.findByIdAndUpdate(
                        commentId,
                        { $set: update },
                        { new: true },
                    );
                    return 'Comment edited successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        //TODO: upvote/downvote mutations
    },
};
