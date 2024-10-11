import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';  
import newsletterRoutes from './routes/newsletter.route.js';
import pollVoteRoutes from './routes/pollvote.route.js';

dotenv.config();  // Load environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Successfully Connected to MongoDB!');
  })
  .catch(err => {
    console.log(err);
  });

const app = express();

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(cookieParser());  // Parse cookie headers

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/newsletter', newsletterRoutes);  // Newsletter subscription route
app.use('/api/pollVote', pollVoteRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});



