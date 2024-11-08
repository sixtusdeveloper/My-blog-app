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
    maxlength: 256, // Limit the message length
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
  creatorUsername: { // Added creator's username to the notification
    type: String,
    required: false, // Optional for flexibility
  },
  creatorProfilePicture: { // Added creator's profile picture URL to the notification
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxR_rp3nHPV73AXGPcOVFX8v8wCh2qw2QiEQ&s',
  },
}, { timestamps: true });

notificationSchema.index({ userId: 1, createdAt: -1 }); // Index for better querying

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
//     maxlength: 256, // Limit the message length
//   },
//   isRead: {
//     type: Boolean,
//     default: false,
//   },
//   type: { 
//     type: String,
//     enum: ['admin_added', 'admin_removed', 'new_post', 'post_updated', 'post_deleted'],
//     required: true,
//   },
//   postId: { 
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Post',
//   },
// }, { timestamps: true });

// notificationSchema.index({ userId: 1, createdAt: -1 }); // Index for better querying

// const Notification = mongoose.model("Notification", notificationSchema);

// export default Notification;











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
//     maxlength: 256, // Limit the message length
//   },
//   isRead: {
//     type: Boolean,
//     default: false,
//   },
//   type: { 
//     type: String,
//     enum: ['admin_added', 'admin_removed', 'new_post', 'post_updated', 'post_deleted'],
//     required: true,
//   },
//   postId: { 
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Post',
//   },
//   creatorProfilePicture: { // Add this field for profile picture
//     type: String,
//     default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxR_rp3nHPV73AXGPcOVFX8v8wCh2qw2QiEQ&s', // Fallback
//   },
// }, { timestamps: true });

// notificationSchema.index({ userId: 1, createdAt: -1 }); // Index for better querying

// const Notification = mongoose.model("Notification", notificationSchema);

// export default Notification;








