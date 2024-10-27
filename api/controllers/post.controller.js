
import { errorHandler } from "../utils/error.js"
import Post from '../models/post.model.js'


// Create post functionality
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

















// import { errorHandler } from "../utils/error.js"
// import Post from '../models/post.model.js'

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
//         const savedPost = await newPost.save()
//         res.status(201).json(savedPost)
        
//     } catch (error) {
//         next(error);
//     }
// }

// // Get post functionality
// export const getposts = async (req, res, next) => {
//     try {
//       const startIndex = parseInt(req.query.startIndex) || 0;   
//       const limit = parseInt(req.query.limit) || 9;  // Default to 3 posts
  
//       const sortDirection = req.query.order === 'asc' ? 1 : -1;  // Ascending or Descending order
  
//       const posts = await Post.find({
//         ...(req.query.userId && { userId: req.query.userId }),
//         ...(req.query.category && { category: req.query.category }),
//         ...(req.query.slug && { slug: req.query.slug }),
//         ...(req.query.postId && { _id: req.query.postId }),
//         ...(req.query.searchTerm && {
//           $or: [
//             { title: { $regex: req.query.searchTerm, $options: "i" } },
//             { content: { $regex: req.query.searchTerm, $options: "i" } },
//           ],
//         }),
//       })
//         .sort({ updatedAt: -1 })  // Sort posts by most recent
//         .skip(startIndex)  // Support for pagination
//         .limit(limit)  // Default to 3 posts unless otherwise specified
//         .populate("userId", "username profilePicture");  // Populate user data
  
//       const totalPosts = await Post.countDocuments();  // Total number of posts
  
//       res.status(200).json({ posts, totalPosts });  // Send response
//     } catch (error) {
//       next(error);  // Handle errors
//     }
// };
  


// // Delete post functionality
// export const deletepost = async (req, res, next) => {
//     if(!req.user.isAdmin || req.params.userId !== req.user.id){
//         return next(errorHandler('You are not allowed to delete a post', 403));
//     }   

//     try {
//         await Post.findByIdAndDelete(req.params.postId);
//         res.status(200).json('Post deleted successfully');
//     } catch (error) {
//         next(error);
//     }
// }

// // Update Post functionality
// export const updatepost = async (req, res, next) => {   

//     if(!req.user.isAdmin || req.user.id !== req.params.userId){
//         return next(errorHandler('You are not allowed to update a post', 403));
//     }   

//     try {
//         const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
//             $set: {
//                 title: req.body.title,
//                 content: req.body.content,
//                 category: req.body.category,
//                 image: req.body.image,
               
//             }
//         }, {new: true});

//         res.status(200).json(updatedPost);
//     } catch (error) {
//         next(error);
//     }
// }