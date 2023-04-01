import mongoose from "mongoose";

const Post = new mongoose.Schema({
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  likes: { type: Number, required: true },
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
