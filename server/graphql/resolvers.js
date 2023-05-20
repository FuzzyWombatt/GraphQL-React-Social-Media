const dateScalar = require('./scalers/date');

const postsResolvers = require('./resolvers/posts');
const usersResolvers = require('./resolvers/users');
const commentsResolvers = require('./resolvers/comments');

module.exports = {
    Date: dateScalar,
    Query: {
        ...commentsResolvers.Query,
        ...postsResolvers.Query,
        ...usersResolvers.Query,
    },
    Mutation: {
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
    },
    Subscription: {
        ...postsResolvers.Subscription,
        ...commentsResolvers.Subscription,
    },
};
