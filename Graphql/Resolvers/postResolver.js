const postModel = require("../../Model/postModel");
const checkAuth = require("../../util/checkAuth");
const { postValidator } = require("../../util/validator");
const  {filter} = require('lodash')
module.exports = {
  Query: {
    async getPosts() {
      // Let's find all Post using mongoose model
      try {
        const posts = await postModel.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await postModel.findOne({ _id: postId });
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
        let post = new postModel({
          body,
          username: user.username,
          createdAt: new Date().toLocaleString(),
        });
        post = await post.save();
        return post;
      } catch (err) {
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
    async commentPost(_, { postId, body }, { req }) {
      // Is user logged In
      const user = await checkAuth(req);
      // Is post Found
      let post = await postModel.findOne({ _id: postId });
      if (!post) throw new Error("post not found");
      post.comments.unshift({
        body: body,
        username: user.username,
        createdAt: new Date().toLocaleString(),
      });
      post = await post.save(); 
      return post; 
    },
    async deleteComment(_,{postId,commentId},{req}) {
      
      await checkAuth(req)
      let post = await postModel.findOne({ _id: postId });
   
post.comments = filter(post.comments, function({_id}) { 
     return _id.toString()!==commentId 
    });
      await post.save()
      return "deleted successfully"



    }
  },
};
