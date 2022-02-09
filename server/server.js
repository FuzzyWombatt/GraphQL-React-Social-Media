const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const {PubSub} = require('graphql-subscriptions')
const cors = require('cors');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const connectDB = require('./config/db');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter')

const startApolloServer = async () => {
    const app = express();

    const pubsub = new PubSub();
    
    connectDB();

    const server = new ApolloServer({
        playground: true,
        typeDefs,
        resolvers,
        //this is to access express objects from apollo context
        context: async({req}) => ({req, pubsub}),
    });
    await server.start();

    app.use(express.json({extended: false}));
    app.use(cors());

    app.use('/api/users',usersRouter);
    app.use('/api/auth',authRouter);

    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 5005;

    await new Promise((resolve) => app.listen(PORT, resolve));
    console.log(`Server ready at http://localhost:5005${server.graphqlPath}`);
    return { server, app };
};

const server = startApolloServer();

module.exports = server;