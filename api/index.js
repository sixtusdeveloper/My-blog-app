import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';  // To serve static files

// Import Routes
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import newsletterRoutes from './routes/newsletter.route.js';
import pollVoteRoutes from './routes/pollvote.route.js';
import contactRoutes from './routes/contact.route.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();  // Project root directory

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('DB connection error:', err));

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes (Handled by a single Express instance)
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/pollVote', pollVoteRoutes);
app.use('/api/contact', contactRoutes);

// Serve Static Files from Frontend Build
app.use(express.static(path.join(__dirname, '/client/dist')));

// Catch-all Route for SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));












// import dotenv from 'dotenv';

// import express from 'express';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';

// import userRoutes from './routes/user.route.js';
// import authRoutes from './routes/auth.route.js';
// import postRoutes from './routes/post.route.js';
// import commentRoutes from './routes/comment.route.js';  
// import newsletterRoutes from './routes/newsletter.route.js';
// import pollVoteRoutes from './routes/pollvote.route.js';
// import contactRoutes from './routes/contact.route.js'; // Import the contact route
// import path from 'path';  // Import the path module


// dotenv.config();  // Load environment variables

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log('Successfully Connected to MongoDB!');
//   })
//   .catch(err => {
//     console.log(err);
//   });

//   const __dirname = path.resolve();  // Define the project root directory  

// const app = express();

// // Middleware
// app.use(express.json());  // Parse JSON request bodies
// app.use(cookieParser());  // Parse cookie headers

// // Routes
// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes);
// app.use('/api/newsletter', newsletterRoutes);  // Newsletter subscription route
// app.use('/api/pollVote', pollVoteRoutes);
// app.use('/api/contact', contactRoutes); // Use the contact route

// // Serve static assets in production
// app.use(express.static(path.join(__dirname, '/client/dist'))); 

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));  
// })


// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
  
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000!');
// });



