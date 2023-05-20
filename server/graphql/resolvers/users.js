const Comment = require('../../models/Comment');
const Post = require('../../models/Post');
const User = require('../../models/User');

module.exports = {
    Query: {
        async getUser(_, userId) {
            try {
                const user = await User.findById(userId).select('-password');
                if (!user) {
                    throw new Error("User doesn't exists");
                } else {
                    return user;
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async getUserComments(_, { userId }) {
            try {
                const comments = await Comment.find({ user: userId });
                return comments;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getUserPosts(_, { userId }) {
            try {
                const posts = await Post.find({ user: userId });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};
