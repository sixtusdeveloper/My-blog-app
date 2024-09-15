import User from '../models/user.model.js';  // Import the User model  
import bcryptjs from 'bcryptjs';  // Import the bcryptjs library    

export const signup = async (req, res) => {

    const { username, email, password } = req.body;  // Extract the username, email and password from the request body 

    if (!username || !email || !password || username === '' || email === '' || password === '') {   // If any of the required fields are missing, return an error
        return res.status(400).json({ message: 'All fields are required' });
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
        res.status(500).json({ message: error.message });  // If an error occurs, return the error message
    }


};  