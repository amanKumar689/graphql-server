const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const resolvers = require("../Graphql/Resolvers/index");
const typeDefs = require("../Graphql/typeDefs");
const mongoose = require('mongoose');
const {MongoDb_connectionString}  = require('../config/mongoDb');



(async function () {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  
  const server = new ApolloServer({
    schema,
    context:({req})=>({req})
  });
  await server.start();
  server.applyMiddleware({ app });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
})();

// * Mongoose connection with MongoDB

mongoose
  .connect(MongoDb_connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection established MongoDb");
  })
  .catch((err) => {
    console.log("error:--> ", err);
  });
