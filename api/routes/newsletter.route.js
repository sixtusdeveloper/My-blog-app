import express from 'express';
import { postnewsletter } from '../controllers/newsletter.controller.js';  // Import the newsletter controller
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();  // Create a new router instance

// Define the POST route for newsletter subscription
router.post('/postnewsletter', verifyToken, postnewsletter);

// Export the router
export default router;
