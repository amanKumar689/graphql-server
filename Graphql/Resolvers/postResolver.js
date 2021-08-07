const jwt = require("jsonwebtoken");
const postModel = require("../../Model/postModel");
const { secretKey } = require("../../config/secretKey");
const checkAuth = require("../../util/checkAuth");
const { postValidator } = require("../../util/validator");
module.exports = {
  Query: {
    async getPosts() {
      // Let's find all Post using mongoose model
      try {
        const posts = await postModel.find();
        console.log("posts", posts);
        return posts;
      } catch (err) {
        console.log("err", err);
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await postModel.findOne({ _id: postId });
        console.log("post getting", post);
        return post;
      } catch (err) {
        throw new Error("post not found");
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      try {
        const user = await checkAuth(context.req);
        console.log("user", user);
        let post = new postModel({
          body,
          username: user.username,
          createdAt: new Date().toLocaleString(),
        });
        post = await post.save();
        return post;
      } catch (err) {
        console.log("error --> ", err);
        throw new Error(err);
      }
    },
    async deletePost(_, { postId }, context) {
      
      // 1ST AUTHENTICATE
      const user = await checkAuth(context.req);

      // 2nd ->  Find post
      let post = await postModel.findOne({ _id: postId });
      if (!post) throw new Error("record not found");

      // If Post found then check for POST_CREATOR === POST_DELETOR

      const Authenticated = postValidator(post, user);
      if (!Authenticated)
        throw new Error(
          "Sorry i think you are a wrong person to delete this post"
        );
      post = await postModel.deleteOne({ _id: postId });
      const err = post.deletedCount === 0 && "Not found record";
      if (err) {
        throw new Error(err);
      }
      return "deleted successfully";
    },
  },
};
