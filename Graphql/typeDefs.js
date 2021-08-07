const { gql } = require("apollo-server");
module.exports = gql`
  type post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }
  input signupType {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type User {
    id: String!
    username: String!
    token: String!
    createdAt: String!
    email: String!
  }
  type Mutation {
    register(signUp: signupType): User! 
    login(username:String!,password:String!) :User!
    createPost(body:String):post!
    deletePost(postId:ID!):String!
   }

  type Query {
    getPosts: [post] 
    getPost(postId:String!) :post!
  }
`;
