import User from '../models/user.model.js';  // Import the User model  
import bcryptjs from 'bcryptjs';  // Import the bcryptjs library 
import { errorHandler } from '../utils/error.js';  // Import the errorHandler function      
import jwt from 'jsonwebtoken';  // Import the jsonwebtoken library

// Sign Up logic
export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;  // Extract the username, email and password from the request body 

    if (!username || !email || !password || username === '' || email === '' || password === '') {   // If any of the required fields are missing, return an error
        next(errorHandler(400, 'All fields are required'));  // Return an error message
    }   

    const hashedPassword = bcryptjs.hashSync(password, 10);  // Hash the password using bcryptjs  

    const newUser = new User({ 
        username, 
        email, 
        password: hashedPassword, 
    });  // Create a new user object with the extracted fields


    try {
        await newUser.save();  // Save the user to the database 
        res.json('User created successfully');  // Return a success message
        
    } catch (error) {
       next(error);  // If an error occurs, return the error message
    }
};  

// Sign In logic
export const signin = async (req, res, next) => { 
    const { email, password } = req.body;  // Extract the email and password from the request body  


    if (!email || !password || email === '' || password === '') {  // If any of the required fields are missing, return an error
        next(errorHandler(400, 'All fields are required'));  // Return an error message
    }   

    try {
        const validUser = await User.findOne({ email });  // Find the user with the provided email address
        if (!validUser) {  // If the user does not exist, return an error
            return next(errorHandler(404, 'User does not exist'));  // Return an error message
        }   

        const validPassword = bcryptjs.compareSync(password, validUser.password);  // Compare the provided password with the hashed password stored in the database 
        if (!validPassword) {  // If the passwords do not match, return an error
            return next(errorHandler(400, 'Invalid password'));  // Return an error message
        }   

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);  // Create a new token with the user's id and the secret key    
        const { password: pass, ...rest } = validUser._doc;  // Extract the user object from the validUser object and exclude the password field  

        res.status(200).cookie('access_token', token, {
            httpOnly: true})
            .json(rest);  // Return a success message
        
    }
    catch (error) {
        next(error);  // If an error occurs, return the error message
    }
 }  // Define the signin function


//  Google Sign In logic
export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;  // Extract the name, email and googlePhotoUrl from the request body  

    try {
        const user = await User.findOne({ email });  // Find the user with the provided email address
       if(user){  // If the user already exists, return a success message
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);  // Create a new token with the user's id and the secret key
            const { password, ...rest } = user._doc;  // Extract the user object from the user object and exclude the password field
            res.status(200).cookie('access_token', token, {
                httpOnly: true})
                .json(rest);  
             // Return a success message
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);  // Generate a random password  
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);  // Hash the generated password using bcryptjs 
            const newUser = new User({ 
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4), 
                email, 
                password: hashedPassword, 
                profilePicture: googlePhotoUrl, 
            });  // Create a new user object with the extracted fields
            await newUser.save();  // Save the user to the database

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);  // Create a new token with the user's id and the secret key
            const { password, ...rest } = newUser._doc;  // Extract the user object from the newUser object and exclude the password field
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            })
            .json(rest);  // Return a success message

        }
    }   
    catch (error) {
        next(error);  // If an error occurs, return the error message
    }
     
}  // Define the google function