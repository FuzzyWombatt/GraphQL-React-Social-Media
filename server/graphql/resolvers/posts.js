const { AuthenticationError } = require('apollo-server-express');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User')

module.exports = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find().sort({totalvotes: -1});
                return posts
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }){
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async createPost(_, { title, body }, context) {
            let user = auth(context);
            
            user = await User.findById(user.id)
            if (!body) {
                throw new Error('Post body must not be empty');
            }

            const newPost = new Post({
                body,
                title,
                user: user.id,
                creator: user.name,
            });

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post,
            });

            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = auth(context);

            try {
                let post = await Post.findById(postId);    

                if (user.id === post.user.toString()) {
                    await Post.findByIdAndDelete(postId);

                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async editPost(_, { postId, body }, context) {
            const user = auth(context);

            let update = {}
            
            if (!body) {
                throw new Error('Post body must not be empty');
            }else{
                update.body = body
                update.dateEdited = Date.now();
            }

            try {
                let post = await Post.findById(postId);

                if (user.id === post.user.toString()) {
                    post = await Post.findByIdAndUpdate(
                        postId,
                        { $set: update },
                        { new: true },
                    );
                    return 'Post edited successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
         //TODO: upvote/downvote mutations
    },
    Subscription: {
        newPost: {
          subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
};
