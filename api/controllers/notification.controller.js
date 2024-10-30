import { errorHandler } from "../utils/error.js";
import Notification from "../models/notification.model.js";

// Create notification functionality
export const createNotification = async (req, res, next) => {
    if (!req.body.message) {
      return next(errorHandler('Message is required', 400));
    }
  
    const newNotification = new Notification({
      ...req.body,
      userId: req.user.id,
    });
  
    try {
      const savedNotification = await newNotification.save();
      res.status(201).json(savedNotification);
    } catch (error) {
      next(error);
    }
};
  

// Notify all users about a new post
// Notify all users about a new post
// Notify all users about a new post
export const notifyUsersAboutNewPost = async (post) => {
    const message = `New post: ${post.title} has been created.`;
    
    try {
      const notifications = await Notification.insertMany(
        post.users.map((user) => ({
          userId: user.id,
          message,
          type: 'new_post',
          postId: post._id,  // Associate with the specific post
        }))
      );
      console.log('Users notified about new post:', notifications);
    } catch (error) {
      console.error('Error sending post notifications:', error);
    }
};
  
  
// Helper function to display time ago format (e.g., 1min ago, 1h ago)
const timeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInMs = now - postDate;
  
    const minutes = Math.floor(diffInMs / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
  
    if (minutes < 60) return `${minutes}min ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return `${weeks}w ago`;
};
  
  
// Notify about admin role changes
export const notifyAdminChange = async (user, action) => {
  const message = `You have been ${action} as an admin.`;
  
  try {
    const notification = new Notification({ userId: user.id, message });
    await notification.save();
    console.log(`Admin change notification sent to user ${user.id}`);
  } catch (error) {
    console.error('Error notifying admin change:', error);
  }
};

// Notify users about post deletion or update
export const notifyPostChange = async (post, changeType) => {
  const message = `The post titled "${post.title}" has been ${changeType}.`;

  try {
    const notifications = await Notification.insertMany(
      post.users.map((user) => ({
        userId: user.id,
        message,
      }))
    );
    console.log('Post change notifications sent:', notifications);
  } catch (error) {
    console.error('Error sending post change notifications:', error);
  }
};

// Get notifications functionality
export const getNotifications = async (req, res, next) => {
    try {
      const notifications = await Notification.find({ userId: req.user.id })
        .sort({ createdAt: -1 });
      const totalCount = notifications.length;
  
      res.status(200).json({ notifications, totalCount });
    } catch (error) {
      next(error);
    }
};
  
// Delete notification functionality
export const deleteNotification = async (req, res, next) => {
    if (req.params.userId !== req.user.id) {
      return next(errorHandler('You are not allowed to delete this notification', 403));
    }
  
    try {
      await Notification.findByIdAndDelete(req.params.notificationId);
      res.status(200).json('Notification deleted successfully');
    } catch (error) {
      next(error);
    }
};
  










// import { errorHandler } from "../utils/error.js";
// import Notification from '../models/notification.model.js';

// // Create notification functionality
// export const createNotification = async (req, res, next) => {
//   if (!req.body.message) {
//     return next(errorHandler('Message is required', 400));
//   }

//   const newNotification = new Notification({
//     ...req.body,
//     userId: req.user.id
//   });

//   try {
//     const savedNotification = await newNotification.save();
//     res.status(201).json(savedNotification);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get notifications functionality
// export const getNotifications = async (req, res, next) => {
//     try {
//       const notifications = await Notification.find({ userId: req.user.id })
//         .sort({ createdAt: -1 });
//       const totalCount = notifications.length;
  
//       res.status(200).json({ notifications, totalCount });
//     } catch (error) {
//       next(error);
//     }
// };
  
// // Delete notification functionality
// export const deleteNotification = async (req, res, next) => {
//   if (req.params.userId !== req.user.id) {
//     return next(errorHandler('You are not allowed to delete this notification', 403));
//   }

//   try {
//     await Notification.findByIdAndDelete(req.params.notificationId);
//     res.status(200).json('Notification deleted successfully');
//   } catch (error) {
//     next(error);
//   }
// };
