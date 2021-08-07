
const { ApolloServer } = require("apollo-server");
const { MongoDb_connectionString } = require("../config/mongoDb");
const mongoose = require("mongoose");
const typeDefs =require('../Graphql/typeDefs')
const resolvers =require('../Graphql/Resolvers/index')


// *  Creating Apollo Server

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:(req)=>({req})
});

// * Mongoose connection with MongoDB

mongoose
  .connect(MongoDb_connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection established MongoDb");
    return server.listen({ port: 5000 }).then((res) => {
      console.log("server is running at " + res.url);
    });
  })
  .catch((err) => {
    console.log("error:--> ", err);
  });
