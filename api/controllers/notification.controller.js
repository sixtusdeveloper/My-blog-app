import { errorHandler } from "../utils/error.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

// Helper: Time Ago formatting
const timeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    if (isNaN(date)) return 'Unknown time'; // Handle invalid dates gracefully
    const diffInMs = now - date;
    const minutes = Math.floor(diffInMs / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (minutes < 60) return `${minutes}min ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return `${weeks}w ago`;
};

export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude sensitive data like password
      if (!user) {
        return next(errorHandler('User not found', 404));
      }
      res.status(200).json(user);
    } catch (error) {
      next(errorHandler('Failed to fetch user details', 500));
    }
};

// Create a new notification
export const createNotification = async (req, res, next) => {
  try {
      const notification = new Notification(req.body);
      const savedNotification = await notification.save();
      res.status(201).json(savedNotification);
  } catch (error) {
      next(errorHandler("Failed to create notification", 500));
  }
};


//================= Working correctly just not fetching and displaying username and profilePicture
export const getNotifications = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get the current user's ID

        const notifications = await Notification.find({ userId })
            .populate({
                path: 'userId', 
                select: 'username profilePictureUrl', // Select only necessary fields from the User
            })
            .populate({
                path: 'postId', 
                select: 'title createdAt', // Select necessary fields from the Post
            })
            .sort({ createdAt: -1 });

        // Format each notification
        const notificationsWithUserDetails = notifications.map((notification) => ({
            _id: notification._id,
            message: notification.message,
            isRead: notification.isRead,
            type: notification.type,
            createdAt: notification.createdAt,
            timeAgo: timeAgo(notification.createdAt), // Add timeAgo formatting
            user: notification.userId, // Populated user details
            post: notification.postId, // Populated post details
            creatorUsername: notification.creatorUsername, // Pass the creator's username
            creatorProfilePicture: notification.creatorProfilePicture, // Pass the creator's profile picture
        }));

        res.status(200).json(notificationsWithUserDetails);
    } catch (error) {
        next(errorHandler('Failed to fetch notifications', 500)); // Send error if something goes wrong
    }
};


// export const getNotifications = async (req, res, next) => {
//     try {
//       const userId = req.user.id; // Extract user ID from the authenticated request
//       const notifications = await Notification.find({ userId })
//         .populate('userId', '-password') // Populate user details without password
//         .populate('postId'); // Optionally, populate the postId if needed
  
//       // Optionally, modify the response to include relevant fields, including the profilePicture from the User model
//       const notificationsWithUserDetails = notifications.map((notification) => ({
//         _id: notification._id,
//         message: notification.message,
//         isRead: notification.isRead,
//         type: notification.type,
//         createdAt: notification.createdAt,
//         timeAgo: timeAgo(notification.createdAt), // Add formatted timeAgo
//         user: notification.userId, // User details populated here (including profilePicture)
//         postId: notification.postId, // If you're also populating the post
//       }));
  
//       res.status(200).json(notificationsWithUserDetails); // Respond with the notifications including user details
//     } catch (error) {
//       next(errorHandler('Failed to fetch notifications', 500)); // Handle any errors
//     }
// };
  
// Delete a notification
export const deleteNotifications = async (req, res, next) => {
    try {
        console.log("Notification ID:", req.params.notificationId); // Debugging log
        const deletedNotification = await Notification.findByIdAndDelete(req.params.notificationId);
        if (!deletedNotification) return next(errorHandler("Notification not found", 404));
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        next(errorHandler("Failed to delete notification", 500));
    }
};


//=============== Previous but working correctly just not fetching and displaying username and profilePicture
export const notifyUsersAboutNewPost = async (post) => {
    console.log("Post creator in notification:", post.creator);
    try {
        // Fetch all admin users to notify them about the new post
        const adminUsers = await User.find({ isAdmin: true });

        // Insert a new notification for each admin
        const notifications = await Notification.insertMany(
            adminUsers.map((admin) => ({
                userId: admin._id,
                message: `New post titled "${post.title}" was created by ${post.creator.username || 'Unknown User'}`,
                type: "new_post",
                postId: post._id,
                creatorUsername: post.creator?.username || 'Unknown User',  // Ensure username is included
                creatorProfilePicture: post.creator?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxR_rp3nHPV73AXGPcOVFX8v8wCh2qw2QiEQ&s', // Fallback image if missing
                createdAt: post.createdAt,
                timeAgo: timeAgo(post.createdAt),  // Format time ago if needed
            }))
        );

        console.log("Admins notified about new post:", notifications);
    } catch (error) {
        console.error("Error sending new post notifications:", error);
    }
};


// export const notifyUsersAboutNewPost = async (post) => {
//     console.log("Post creator in notification:", post.creator);
//     try {
//         const adminUsers = await User.find({ isAdmin: true });

//         const notifications = await Notification.insertMany(
//             adminUsers.map((admin) => ({
//                 userId: admin._id,
//                 message: `New post titled "${post.title}" was created by ${post.user?.username || 'Unknown User'}`, // Ensure username is used here
//                 type: "new_post",
//                 postId: post._id,
//                 creatorProfilePicture: post.creator?.profilePicture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxR_rp3nHPV73AXGPcOVFX8v8wCh2qw2QiEQ&s', // Provide fallback if needed
//                 createdAt: post.createdAt,
//                 timeAgo: timeAgo(post.createdAt),
//             }))
//         );

//         console.log("Admins notified about new post:", notifications);
//     } catch (error) {
//         console.error("Error sending new post notifications:", error);
//     }
// };

// Notify admin users about post deletion
export const notifyPostChange = async (post, changeType) => {
    try {
        const adminUsers = await User.find({ isAdmin: true });

        const notifications = await Notification.insertMany(
            adminUsers.map((admin) => ({
                userId: admin._id,
                message: `The post titled "${post.title}" has been ${changeType}.`,
                type: `${changeType}_post`,
                postId: post._id,
                timeAgo: timeAgo(post.updatedAt || new Date()), // Ensure correct time
            }))
        );
        

        console.log("Admins notified about post change:", notifications);
    } catch (error) {
        console.error("Error sending post change notifications:", error);
    }
};

// Notify about admin role changes
export const notifyAdminChange = async (user, action) => {
    try {
        const adminUsers = await User.find({ isAdmin: true });

        const notifications = await Notification.insertMany(
            adminUsers.map((admin) => ({
                userId: admin._id,
                message: `${user.username} has been ${action} as an admin.`,
                type: `${action}_admin`,
                affectedUserId: user._id,
                timeAgo: timeAgo(new Date()), // Timestamp the notification
            }))
        );
        

        console.log(`Admin role change notifications sent for ${action}:`, notifications);
    } catch (error) {
        console.error("Error notifying admin role change:", error);
    }
};

export const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
      // Update the notification to mark it as read
      const updatedNotification = await Notification.findByIdAndUpdate(
          notificationId,
          { isRead: true },
          { new: true } // Return the updated document
      );

      if (!updatedNotification) {
          return res.status(404).json({ message: 'Notification not found' });
      }

      res.status(200).json({ message: 'Notification marked as read', notification: updatedNotification });
  } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};











//================= Previous code without a proper implementation of the notification controller. 

// import { errorHandler } from "../utils/error.js";
// import Notification from "../models/notification.model.js";

// // Create notification functionality
// export const createNotification = async (req, res, next) => {
//     if (!req.body.message) {
//       return next(errorHandler('Message is required', 400));
//     }
  
//     const newNotification = new Notification({
//       ...req.body,
//       userId: req.user.id,
//     });
  
//     try {
//       const savedNotification = await newNotification.save();
//       res.status(201).json(savedNotification);
//     } catch (error) {
//       next(error);
//     }
// };
  

// // Notify all users about a new post
// // Notify all users about a new post
// // Notify all users about a new post
// export const notifyUsersAboutNewPost = async (post) => {
//     const message = `New post: ${post.title} has been created.`;
    
//     try {
//       const notifications = await Notification.insertMany(
//         post.users.map((user) => ({
//           userId: user.id,
//           message,
//           type: 'new_post',
//           postId: post._id,  // Associate with the specific post
//         }))
//       );
//       console.log('Users notified about new post:', notifications);
//     } catch (error) {
//       console.error('Error sending post notifications:', error);
//     }
// };
  
  
// // Helper function to display time ago format (e.g., 1min ago, 1h ago)
// const timeAgo = (timestamp) => {
//     const now = new Date();
//     const postDate = new Date(timestamp);
//     const diffInMs = now - postDate;
  
//     const minutes = Math.floor(diffInMs / 60000);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const weeks = Math.floor(days / 7);
  
//     if (minutes < 60) return `${minutes}min ago`;
//     if (hours < 24) return `${hours}h ago`;
//     if (days < 7) return `${days}d ago`;
//     return `${weeks}w ago`;
// };
  
  
// // Notify about admin role changes
// export const notifyAdminChange = async (user, action) => {
//   const message = `You have been ${action} as an admin.`;
  
//   try {
//     const notification = new Notification({ userId: user.id, message });
//     await notification.save();
//     console.log(`Admin change notification sent to user ${user.id}`);
//   } catch (error) {
//     console.error('Error notifying admin change:', error);
//   }
// };

// // Notify users about post deletion or update
// export const notifyPostChange = async (post, changeType) => {
//   const message = `The post titled "${post.title}" has been ${changeType}.`;

//   try {
//     const notifications = await Notification.insertMany(
//       post.users.map((user) => ({
//         userId: user.id,
//         message,
//       }))
//     );
//     console.log('Post change notifications sent:', notifications);
//   } catch (error) {
//     console.error('Error sending post change notifications:', error);
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
//     if (req.params.userId !== req.user.id) {
//       return next(errorHandler('You are not allowed to delete this notification', 403));
//     }
  
//     try {
//       await Notification.findByIdAndDelete(req.params.notificationId);
//       res.status(200).json('Notification deleted successfully');
//     } catch (error) {
//       next(error);
//     }
// };
  










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
