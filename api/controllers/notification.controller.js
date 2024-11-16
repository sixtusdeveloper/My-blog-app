// import { errorHandler } from "../utils/error.js";
// import Notification from "../models/notification.model.js";
// import User from "../models/user.model.js";
// import { DEFAULT_PROFILE_PICTURE } from "../utils/constants.js";
// import Post from "../models/post.model.js"; // Import Post model if needed

// // Helper: Time Ago formatting
// const timeAgo = (timestamp) => {
//     const now = new Date();
//     const date = new Date(timestamp);
//     const diffInMs = now - date;
//     const minutes = Math.floor(diffInMs / 60000);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const weeks = Math.floor(days / 7);
//     if (minutes < 60) return `${minutes}min ago`;
//     if (hours < 24) return `${hours}h ago`;
//     if (days < 7) return `${days}d ago`;
//     return `${weeks}w ago`;
// };

// // Retrieve the current user (using ID from `req.user.id`)
// export const getUser = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         if (!user) return next(errorHandler('User not found', 404));
//         res.status(200).json(user);
//     } catch (error) {
//         next(errorHandler('Failed to fetch user details', 500));
//     }
// };

// // Create a new notification
// export const createNotification = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.body.userId);
//         if (!user) return res.status(404).json({ error: 'User not found' });

//         const notificationData = {
//             ...req.body,
//             creatorUsername: user.username,
//             creatorProfilePicture: user.profilePicture,
//         };

//         const notification = new Notification(notificationData);
//         const savedNotification = await notification.save();
//         res.status(201).json(savedNotification);
//     } catch (error) {
//         next(errorHandler("Failed to create notification", 500));
//     }
// };

// // Fetch notifications for the current user


// export const getNotifications = async (req, res, next) => {
//     try {
//         const userId = req.user.id;
//         const notifications = await Notification.find({ userId })
//             .populate('userId', 'username profilePicture')
//             .populate('postId', 'title createdAt')
//             .sort({ createdAt: -1 });

//         const notificationsWithUserDetails = notifications.map((notification) => ({
//             _id: notification._id,
//             message: notification.message,
//             isRead: notification.isRead,
//             type: notification.type,
//             createdAt: notification.createdAt,
//             timeAgo: timeAgo(notification.createdAt),
//             user: notification.userId,
//             post: notification.postId,
//             creatorUsername: notification.creatorUsername,
//             creatorProfilePicture: notification.creatorProfilePicture,
//         }));

//         res.status(200).json(notificationsWithUserDetails);
//     } catch (error) {
//         next(errorHandler('Failed to fetch notifications', 500));
//     }
// };


// // Working but not displaying the username and profile picture
// export const notifyUsersAboutNewPost = async (post) => {
//   try {
//     // Explicitly populate the userId field with both username and profilePicture
//     const fullPost = await Post.findById(post._id).populate({
//       path: 'userId',
//       select: 'username profilePicture',
//     });

//     if (!fullPost) {
//       console.error("Post not found or could not be populated:", post._id);
//       return;
//     }

//     // Check populated data
//     console.log("Populated user data:", fullPost.userId);

//     const creatorUsername = fullPost.userId?.username || 'Unknown User';
//     const creatorProfilePicture = fullPost.userId?.profilePicture || DEFAULT_PROFILE_PICTURE;

//     // Fetch all admin users to send notifications
//     const adminUsers = await User.find({ isAdmin: true });

//     const notifications = adminUsers.map((admin) => ({
//       userId: admin._id,
//       message: `New post titled "${fullPost.title}" was created by ${creatorUsername}`,
//       type: "new_post",
//       postId: fullPost._id,
//       creatorUsername,
//       creatorProfilePicture,
//       createdAt: fullPost.createdAt,
//     }));

//     // Log notifications to verify details
//     console.log("Notifications being created:", notifications);

//     await Notification.insertMany(notifications);
//   } catch (error) {
//     console.error("Error sending new post notifications:", error);
//   }
// };


// // Notify admins about post updates
// export const notifyPostChange = async (post, changeType) => {
//     try {
//         const adminUsers = await User.find({ isAdmin: true });
//         const notifications = await Notification.insertMany(
//             adminUsers.map((admin) => ({
//                 userId: admin._id,
//                 message: `The post titled "${post.title}" has been ${changeType}.`,
//                 type: `${changeType}_post`,
//                 postId: post._id,
//                 timeAgo: timeAgo(post.updatedAt || new Date()),
//             }))
//         );
//         console.log("Admins notified about post change:", notifications);
//     } catch (error) {
//         console.error("Error sending post change notifications:", error);
//     }
// };

// // Notify about admin role changes
// export const notifyAdminChange = async (user, action) => {
//     try {
//         const adminUsers = await User.find({ isAdmin: true });
//         const notifications = await Notification.insertMany(
//             adminUsers.map((admin) => ({
//                 userId: admin._id,
//                 message: `${user.username} has been ${action} as an admin.`,
//                 type: `${action}_admin`,
//                 affectedUserId: user._id,
//                 timeAgo: timeAgo(new Date()),
//             }))
//         );
//         console.log(`Admin role change notifications sent for ${action}:`, notifications);
//     } catch (error) {
//         console.error("Error notifying admin role change:", error);
//     }
// };

// // Mark notification as read
// export const markNotificationAsRead = async (req, res) => {
//     const { notificationId } = req.params;
//     try {
//         const updatedNotification = await Notification.findByIdAndUpdate(
//             notificationId,
//             { isRead: true },
//             { new: true }
//         );
//         if (!updatedNotification) {
//             return res.status(404).json({ message: 'Notification not found' });
//         }
//         res.status(200).json({ message: 'Notification marked as read', notification: updatedNotification });
//     } catch (error) {
//         console.error('Error marking notification as read:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Delete a notification
// export const deleteNotifications = async (req, res, next) => {
//     try {
//         const deletedNotification = await Notification.findByIdAndDelete(req.params.notificationId);
//         if (!deletedNotification) return next(errorHandler("Notification not found", 404));
//         res.status(200).json({ message: "Notification deleted successfully" });
//     } catch (error) {
//         next(errorHandler("Failed to delete notification", 500));
//     }
// };









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

// Create a new notification
export const createNotification = async (req, res, next) => {
  try {
    // Fetch user data to get username and profile picture
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const notificationData = {
      ...req.body,
      creatorUsername: user.username,
      creatorProfilePicture: user.profilePictureUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxR_rp3nHPV73AXGPcOVFX8v8wCh2qw2QiEQ&s',
    };

    const notification = new Notification(notificationData);
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    next(errorHandler("Failed to create notification", 500));
  }
};

// Current code for notification controller

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
  

//=============== Current code for notification controller
// export const notifyUsersAboutNewPost = async (post) => {
//   try {
//       // Populate the post creator's details
//       const fullPost = await post.populate('creator', 'username profilePicture').execPopulate();
      
//       const adminUsers = await User.find({ isAdmin: true });

//       const notifications = adminUsers.map((admin) => ({
//           userId: admin._id,
//           message: `New post titled "${fullPost.title}" was created by ${fullPost.creator.username}`,
//           type: "new_post",
//           username: fullPost.creator.username,
//           postId: fullPost._id,
//           creatorUsername: fullPost.creator.username,
//           creatorProfilePicture: fullPost.creator.profilePicture || 'https://default-profile-url.com', // Add default if needed
//           createdAt: fullPost.createdAt,
//       }));

//       await Notification.insertMany(notifications);
//   } catch (error) {
//       console.error("Error sending new post notifications:", error);
//   }
// };



export const notifyUsersAboutNewPost = async (post) => {
    console.log("Post creator in notification:", post.creator); // Debug log

    try {
        const adminUsers = await User.find({ isAdmin: true });

        const notifications = adminUsers.map((admin) => ({
            userId: admin._id,
            message: `New post titled "${post.title} was created by ${post.creator.username}`,
            type: "new_post",
            username: post.creator.username,
            postId: post._id,
            creatorUsername: post.creator.username,
            creatorProfilePicture: post.creator.profilePicture,
            createdAt: post.createdAt,
        }));

        console.log("Notifications to be inserted:", notifications); // Debug log

        await Notification.insertMany(notifications);
        console.log("Admins notified about new post:", notifications);
    } catch (error) {
        console.error("Error sending new post notifications:", error);
    }
};

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



// Notify admin users about post deletion

export const notifyPostChange = async (post, changeType) => {
    console.log("Notifying post change for:", post, "Change type:", changeType); // Debug log
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
    console.log("Notifying admin change for:", user, "Action:", action); // Debug log
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

// Mark a notification as read (update the isRead field)    
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
