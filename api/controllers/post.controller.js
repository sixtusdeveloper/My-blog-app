// import { errorHandler } from "../utils/error.js";
// import Post from '../models/post.model.js';
// import Notification from '../models/notification.model.js'; // Adjust the path as necessary



// // Create post functionality
// // export const create = async (req, res, next) => {
// //     if (!req.user.isAdmin) {
// //         return next(errorHandler('You are not allowed to create a post', 403));
// //     }

// //     if (!req.body.title || !req.body.content) {
// //         return next(errorHandler('Title and content are required', 400));
// //     }

// //     const slug = req.body.title
// //         .split(' ')
// //         .join('-')
// //         .toLowerCase()
// //         .replace(/[^a-zA-Z0-9-]/g, '');

// //     const newPost = new Post({
// //         ...req.body,
// //         slug,
// //         userId: req.user.id,
// //     });

// //     try {
// //         const savedPost = await newPost.save();

// //         // Notification for new post creation
// //         const message = `New post titled "${savedPost.title}" created by ${req.userId.username}.`;
// //         const notification = new Notification({
// //             userId: req.user.id,
// //             message,
// //             type: 'new_post',
// //             postId: savedPost._id,
// //         });

// //         await notification.save(); // Save notification
// //         res.status(201).json(savedPost);
// //     } catch (error) {
// //         next(error);
// //     }
// // };

// // This logic includes the notification creation logic. We create a new notification for each user in the database, notifying them of the new post. We also include the post ID in the notification so that users can easily access the post. This is a common practice in social media applications.
// export const create = async (req, res, next) => {
//     if(!req.user.isAdmin){
//         return next(errorHandler('You are not allowed to create a post', 403));
//     }

//     if(!req.body.title || !req.body.content){
//         return next(errorHandler('Title and content are required', 400));   
//     }

//     const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
//     const newPost = new Post({
//         ...req.body, 
//         slug, 
//         userId: req.user.id
//     });

//     try {
//         const savedPost = await newPost.save();
        
//         // Create a notification after saving the post
//         const message = `New post titled "${savedPost.title}" created by ${req.user.username}.`;
//         const notification = new Notification({
//             userId: req.user.id, // Change this if you want to notify multiple users
//             message,
//             type: 'new_post',
//             postId: savedPost._id,
//         });

//         await notification.save(); // Save the notification

//         res.status(201).json(savedPost);
        
//     } catch (error) {
//         next(error);
//     }
// }

// // ======================== This doesn't include the notification logic ========================

// // export const create = async (req, res, next) => {
   
// //     if(!req.user.isAdmin){
// //         return next(errorHandler('You are not allowed to create a post', 403));
// //     }

// //     if(!req.body.title || !req.body.content){
// //         return next(errorHandler('Title and content are required', 400));   
// //     }
// //     const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

// //     const newPost = new Post({
// //         ...req.body, 
// //         slug, 
// //         userId: req.user.id
// //     });

// //     try {
// //         const savedPost = await newPost.save()
// //         res.status(201).json(savedPost)
        
// //     } catch (error) {
// //         next(error);
// //     }
// // }

// // Get post functionality
// export const getposts = async (req, res, next) => {
//     try {
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 9;
//         const sortDirection = req.query.order === 'asc' ? 1 : -1;

//         const filters = {
//             ...(req.query.userId && { userId: req.query.userId }),
//             ...(req.query.category && { category: req.query.category }),
//             ...(req.query.slug && { slug: req.query.slug }),
//             ...(req.query.postId && { _id: req.query.postId }),
//             ...(req.query.searchTerm && {
//                 $or: [
//                     { title: { $regex: req.query.searchTerm, $options: 'i' } },
//                     { content: { $regex: req.query.searchTerm, $options: 'i' } },
//                 ],
//             }),
//         };

//         const posts = await Post.find(filters)
//             .sort({ updatedAt: sortDirection })
//             .skip(startIndex)
//             .limit(limit)
//             .populate('userId', 'username profilePicture');

//         const totalPosts = await Post.countDocuments(filters); // Total filtered posts

//         res.status(200).json({ posts, totalPosts });
//     } catch (error) {
//         next(error);
//     }
// };

// // export const getposts = async (req, res, next) => {
// //     try {
// //       const startIndex = parseInt(req.query.startIndex) || 0;   
// //       const limit = parseInt(req.query.limit) || 9;  // Default to 3 posts
  
// //       const sortDirection = req.query.order === 'asc' ? 1 : -1;  // Ascending or Descending order
  
// //       const posts = await Post.find({
// //         ...(req.query.userId && { userId: req.query.userId }),
// //         ...(req.query.category && { category: req.query.category }),
// //         ...(req.query.slug && { slug: req.query.slug }),
// //         ...(req.query.postId && { _id: req.query.postId }),
// //         ...(req.query.searchTerm && {
// //           $or: [
// //             { title: { $regex: req.query.searchTerm, $options: "i" } },
// //             { content: { $regex: req.query.searchTerm, $options: "i" } },
// //           ],
// //         }),
// //       })
// //         .sort({ updatedAt: -1 })  // Sort posts by most recent
// //         .skip(startIndex)  // Support for pagination
// //         .limit(limit)  // Default to 3 posts unless otherwise specified
// //         .populate("userId", "username profilePicture");  // Populate user data
  
// //       const totalPosts = await Post.countDocuments();  // Total number of posts
  
// //       res.status(200).json({ posts, totalPosts });  // Send response
// //     } catch (error) {
// //       next(error);  // Handle errors
// //     }
// // };
  

// // Delete post functionality
// export const deletepost = async (req, res, next) => {
//     if (!req.user.isAdmin || req.params.userId !== req.user.id) {
//         return next(errorHandler('You are not allowed to delete this post', 403));
//     }

//     try {
//         const post = await Post.findById(req.params.postId);
//         if (!post) return next(errorHandler('Post not found', 404));

//         await Post.findByIdAndDelete(req.params.postId);

//         // Notification for post deletion
//         const message = `Post titled "${post.title}" has been deleted.`;
//         const notification = new Notification({
//             userId: req.user.id,
//             message,
//             type: 'post_deleted',
//             postId: post._id,
//         });

//         await notification.save(); // Save notification
//         res.status(200).json('Post deleted successfully');
//     } catch (error) {
//         next(error);
//     }
// };

// // This logic includes the notification creation logic. We create a new notification for each user in the database, notifying them of the deleted post. We also include the post ID in the notification so that users can easily access the post. This is a common practice in social media applications.
// // export const deletepost = async (req, res, next) => {
// //     if(!req.user.isAdmin || req.params.userId !== req.user.id){
// //         return next(errorHandler('You are not allowed to delete a post', 403));
// //     }   

// //     try {
// //         const post = await Post.findById(req.params.postId); // Find the post first
// //         await Post.findByIdAndDelete(req.params.postId);
        
// //         // Create a notification for the deleted post
// //         const message = `Post titled "${post.title}" has been deleted.`;
// //         const notification = new Notification({
// //             userId: req.user.id, // Adjust accordingly
// //             message,
// //             type: 'post_deleted',
// //             postId: post._id,
// //         });

// //         await notification.save(); // Save the notification

// //         res.status(200).json('Post deleted successfully');
// //     } catch (error) {
// //         next(error);
// //     }
// // }


// // This is logic doesn't inlcude the notification logic. You can add the notification logic as needed.
// // export const deletepost = async (req, res, next) => {
// //     if(!req.user.isAdmin || req.params.userId !== req.user.id){
// //         return next(errorHandler('You are not allowed to delete a post', 403));
// //     }   

// //     try {
// //         await Post.findByIdAndDelete(req.params.postId);
// //         res.status(200).json('Post deleted successfully');
// //     } catch (error) {
// //         next(error);
// //     }
// // }



// // Update Post functionality
// export const updatepost = async (req, res, next) => {
//     if (!req.user.isAdmin || req.user.id !== req.params.userId) {
//         return next(errorHandler('You are not allowed to update this post', 403));
//     }

//     try {
//         const updatedPost = await Post.findByIdAndUpdate(
//             req.params.postId,
//             {
//                 $set: {
//                     title: req.body.title,
//                     content: req.body.content,
//                     category: req.body.category,
//                     image: req.body.image,
//                 },
//             },
//             { new: true }
//         );

//         if (!updatedPost) return next(errorHandler('Post not found', 404));

//         // Notification for post update
//         const message = `Post titled "${updatedPost.title}" has been updated.`;
//         const notification = new Notification({
//             userId: req.user.id,
//             message,
//             type: 'post_updated',
//             postId: updatedPost._id,
//         });

//         await notification.save(); // Save notification
//         res.status(200).json(updatedPost);
//     } catch (error) {
//         next(error);
//     }
// };

// // This is function includes the notification logic. We create a new notification after updating the post, notifying users of the change. We include the post ID in the notification so that users can easily access the post. This is a common practice in social media applications.
// // export const updatepost = async (req, res, next) => {   
// //     if(!req.user.isAdmin || req.user.id !== req.params.userId){
// //         return next(errorHandler('You are not allowed to update a post', 403));
// //     }   

// //     try {
// //         const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
// //             $set: {
// //                 title: req.body.title,
// //                 content: req.body.content,
// //                 category: req.body.category,
// //                 image: req.body.image,
// //             }
// //         }, { new: true });

// //         // Create a notification after updating the post
// //         const message = `Post titled "${updatedPost.title}" has been updated.`;
// //         const notification = new Notification({
// //             userId: req.user.id, // Again, adjust based on who should be notified
// //             message,
// //             type: 'post_updated',
// //             postId: updatedPost._id,
// //         });

// //         await notification.save(); // Save the notification

// //         res.status(200).json(updatedPost);
// //     } catch (error) {
// //         next(error);
// //     }
// // }

// //==============  This function doesn't include the notification logic. You can add the notification logic as needed.
// // export const updatepost = async (req, res, next) => {   

// //     if(!req.user.isAdmin || req.user.id !== req.params.userId){
// //         return next(errorHandler('You are not allowed to update a post', 403));
// //     }   

// //     try {
// //         const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
// //             $set: {
// //                 title: req.body.title,
// //                 content: req.body.content,
// //                 category: req.body.category,
// //                 image: req.body.image,
               
// //             }
// //         }, {new: true});

// //         res.status(200).json(updatedPost);
// //     } catch (error) {
// //         next(error);
// //     }
// // }

















import { errorHandler } from "../utils/error.js"
import Post from '../models/post.model.js'

export const create = async (req, res, next) => {
   
    if(!req.user.isAdmin){
        return next(errorHandler('You are not allowed to create a post', 403));
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandler('Title and content are required', 400));   
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body, 
        slug, 
        userId: req.user.id
    });

    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
        
    } catch (error) {
        next(error);
    }
}

// Get post functionality
export const getposts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;   
      const limit = parseInt(req.query.limit) || 9;  // Default to 3 posts
  
      const sortDirection = req.query.order === 'asc' ? 1 : -1;  // Ascending or Descending order
  
      const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { content: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        }),
      })
        .sort({ updatedAt: -1 })  // Sort posts by most recent
        .skip(startIndex)  // Support for pagination
        .limit(limit)  // Default to 3 posts unless otherwise specified
        .populate("userId", "username profilePicture");  // Populate user data
  
      const totalPosts = await Post.countDocuments();  // Total number of posts
  
      res.status(200).json({ posts, totalPosts });  // Send response
    } catch (error) {
      next(error);  // Handle errors
    }
};
  


// Delete post functionality
export const deletepost = async (req, res, next) => {
    if(!req.user.isAdmin || req.params.userId !== req.user.id){
        return next(errorHandler('You are not allowed to delete a post', 403));
    }   

    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('Post deleted successfully');
    } catch (error) {
        next(error);
    }
}

// Update Post functionality
export const updatepost = async (req, res, next) => {   

    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler('You are not allowed to update a post', 403));
    }   

    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
            $set: {
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                image: req.body.image,
               
            }
        }, {new: true});

        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
}