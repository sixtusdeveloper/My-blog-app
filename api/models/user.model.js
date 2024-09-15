import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },  

    password: {
        type: String,
        required: true
    },
 
    }, 
    { timestamps: true }
);


const User = mongoose.model('User', userSchema);    // Create a User model from the userSchema

export default User;    // Export the User model