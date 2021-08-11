const { gql } = require("apollo-server");
module.exports = gql`
  type comment {
    username: String!
    createdAt: String!
    body: String!
  }
  type like {
    username: String!
    createdAt: String!
  }
  type post {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
    comments: [comment]
    Likes: [like]
    commentCount:Int!
    likeCount:Int!
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
    login(username: String!, password: String!): User!
    createPost(body: String): post!
    deletePost(postId: ID!): String!
    commentPost(postId: ID!, body: String!): post!
    deleteComment(postId: ID!, commentId: ID!): String!
    likePost(postId: String!): post!
  }

  type Query {
    getPosts: [post]
    getPost(postId: String!): post!
  }
  type Subscription {
    newPost:post!
  }`
