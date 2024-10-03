import bcryptjs from 'bcryptjs';   // import bcryptjs to hash passwords
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';  // import the errorHandler function

export const test = ((req, res) => {
    res.json({message: 'API is running!'});
});   // test function to check if the API is running 

export const updateUser = async (req, res, next) => {  

    // Check if the user is authorized to update their profile
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not authorized to perform this action'));  
    }

    // Validate and hash the password if provided
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters long'));  
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Validate the username if provided
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters long'));  
        }

        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));  
        }

        // Check if the new username is not lowercase
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase')); 
        }

        // Check if the username contains only allowed characters (lowercase letters and numbers)
        if (!req.body.username.match(/^[a-z0-9]+$/)) {
            return next(errorHandler(400, 'Username can only contain lowercase letters and numbers'));  
        }
    }

    // Update the user
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,  
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            },
        }, { new: true });  // Update and return the new user object

        const { password, ...rest } = updatedUser._doc;  // Exclude the password from the updated user object
        res.status(200).json(rest);  // Return the updated user data
    } catch (error) {
        next(error);  // Handle any errors
    }
};

// deleteUser function to delete a user account
export const deleteUser = async (req, res, next) => {   

    // Check if the user is authorized to delete their profile
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not authorized to perform this action'));  
    }

    // Delete the user
    try {
        await User.findByIdAndDelete(req.params.userId);  // Find and delete the user
        res.status(200).json({ message: 'User deleted successfully' });  // Return a success message
    } catch (error) {
        next(error);  // Handle any errors
        
    }

}  

export const signout = (req, res) => {
    try {
        res.clearCookie('access_token');  // Clear the cookie
        res.status(200).json('User has been signed out' );  // Return a success message
    } catch (error) {
        next(error);  // Handle any errors
    }
}


// export const getUsers = async (req, res, next) => {

//     if(!req.user.isAdmin){
//         return next(errorHandler(403, 'You are not authorized to perform this action'));
//     }
//     try {
//         const startIndex = parseInt(req.query.startIndex) || 0;  // Get the startIndex from the query parameters
//         const limit = parseInt(req.query.limit) || 10;  // Get the limit from the query parameters
//         const sortDirection = req.query.sort === 'asc' ? 1 : -1;  // Get the sortDirection from the query parameters

//         const users = await User.find().sort({ createdAt: sortDirection}).skip(startIndex).limit(limit);  // Find all users   

//         const usersWithoutPassword = users.map((user) => { // Exclude the password from the user data
//             const { password, ...rest } = user._doc;
//             return rest;
//         });

//         const totalUsers = await User.countDocuments();  // Get the total number of users   
//         const now = new Date();  // Get the current date    

//         const oneMonthAgo = new Date(  // Get the date one month ago
//             now.getFullYear(),
//             now.getMonth() - 1,
//             now.getDate()
//         );  

//         const lastMonthUsers = await User.countDocuments({  // Get the number of users created in the last month
//             createdAt: {
//                 $gte: oneMonthAgo,
//             }
//         }); 

//         res.status(200).json({ users: usersWithoutPassword, totalUsers, lastMonthUsers });  // Return the users data    
//     } catch (error) {
//         next(error);  // Handle any errors
//     }
// }

export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to see all users'));
    }
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'asc' ? 1 : -1;
  
      const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const usersWithoutPassword = users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      });
  
      const totalUsers = await User.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        users: usersWithoutPassword,
        totalUsers,
        lastMonthUsers,
      });
    } catch (error) {
      next(error);
    }
  };


export const getUser = async (req, res, next) => {
    try {
        const user  = await User.findById(req.params.userId);  // Find the user by id   
        const { password, ...rest } = user._doc;  // Exclude the password from the user data
        res.status(200).json(rest);  // Return the user data
    }
    catch (error) {
        next(error);  // Handle any errors
    }
}