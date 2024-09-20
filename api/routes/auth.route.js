import express from 'express';
import { google, signup, signin } from '../controllers/auth.controller.js';  // Import the signup function from the controller  
 

const router = express.Router();    // Create a new router object

router.post('/signup', signup)   // Define a new route for POST requests to /login
router.post('/signin', signin)   // Define a new route for POST requests to /login
router.post('/google', google)   // Define a new route for POST requests to /login

export default router;   // Export the router object