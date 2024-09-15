import User from '../models/user.model.js';  // Import the User model  
import bcryptjs from 'bcryptjs';  // Import the bcryptjs library 
import { errorHandler } from '../utils/error.js';  // Import the errorHandler function      

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;  // Extract the username, email and password from the request body 

    if (!username || !email || !password || username === '' || email === '' || password === '') {   // If any of the required fields are missing, return an error
        next(errorHandler(400, 'All fields are required'));  // Return an error message
    }   

    const hashedPassword = bcryptjs.hashSync(password, 10);  // Hash the password using bcryptjs  

    const newUser = new User({ 
        username, 
        email, 
        password: hashedPassword 
    });  // Create a new user object with the extracted fields


    try {
        await newUser.save();  // Save the user to the database 
        res.json('User created successfully');  // Return a success message
        
    } catch (error) {
       next(error);  // If an error occurs, return the error message
    }
};  