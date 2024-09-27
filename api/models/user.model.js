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

    profilePicture: {
        type: String,
        default: 
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
 
    },
    isAdmin: {
        type: Boolean,
        default : false, 
    },
  },

    { timestamps: true }
);


const User = mongoose.model('User', userSchema);    // Create a User model from the userSchema

export default User;    // Export the User model