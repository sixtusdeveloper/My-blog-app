import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  type: { 
    type: String,
    enum: ['admin_added', 'admin_removed', 'new_post', 'post_updated', 'post_deleted'],
    required: true,
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;












// import mongoose from 'mongoose';

// const notificationSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   isRead: {
//     type: Boolean,
//     default: false,
//   },
//   type: { // New field to define the type of notification
//     type: String,
//     enum: ['admin_added', 'admin_removed', 'new_post', 'post_updated', 'post_deleted'],
//     required: true,
//   },
//   postId: { // New field to associate the notification with a specific post
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Post',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// }, { timestamps: true });

// const Notification = mongoose.model("Notification", notificationSchema);

// export default Notification;
