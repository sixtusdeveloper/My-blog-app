
// improved code for post model: including the notification model
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 1, // Ensure there's at least some content
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxR_rp3nHPV73AXGPcOVFX8v8wCh2qw2QiEQ&s",
  },
  category: {
    type: String,
    default: "uncategorized",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

postSchema.index({ userId: 1, createdAt: -1 }); // Index for better querying

const Post = mongoose.model("Post", postSchema);

export default Post;






// Previous code for post model: but not including the notification model
// import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   image: {
//     type: String,
//     default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxR_rp3nHPV73AXGPcOVFX8v8wCh2qw2QiEQ&s",
//   },
//   category: {
//     type: String,
//     default: "uncategorized",
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// }, { timestamps: true });

// const Post = mongoose.model("Post", postSchema);

// export default Post;



