const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date

    type Post {
        id: ID!
        user: ID!
        creator: String!
        title: String!
        body: String!
        upvotes: [ID!]!
        downvotes: [ID!]!
        totalVote: Int
        commentCount: Int!
        date: Date!
        dateEdited: Date
    }

    type Comment {
        id: ID!
        user: ID!
        post: ID!
        body: String!
        upvotes: [ID!]!
        downvotes: [ID!]!
        totalvote: Int!
        date: Date!
        dateEdited: Date
    }

    type User {
        id: ID!
        name: String!
        email: String!
        date: Date!
    }

    type Query {
        getPosts: [Post!]!
        getPost(postId: ID!): Post!
        getComments(postId: ID!): [Comment!]!
        getUser(userId: ID!): User!
        getUserPosts(userId: ID!): [Post!]!
        getUserComments(userId: ID!): [Comment!]!
    }

    type Mutation {
        createPost(title: String!, body: String!): Post!
        deletePost(postId: ID!): String!
        editPost(postId: ID!, body: String!): String!
        createComment(postId: ID!, body: String!): Comment!
        deleteComment(commentId: ID!): String!
        editComment(commentId: ID!, body: String!): Comment!
    }
    type Subscription {
        newPost: Post!
    }
`;
