const { Schema, model, Model } = require("mongoose");

const postSchema = new Schema({
  username: String,
  body: String,
  createdAt: String,
  comments: [
    {
      username: String,
      createdAt: String,
      body: String,
    },
  ],
  Likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    // ! This term didn't go well for me
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
const postModel = model("posts", postSchema);


module.exports =  postModel;
